Meteor.publish('leaderboards', function(target_name) {
  if (!this.userId) {
    this.ready();
    return;
  }

  let initializing = true;
  const deadline = getDeadline(target_name);
  const selector = {
    target_name: target_name,
    score: { $gt: 0 }
  };

  const pipeline = [
    { $match: selector },
    { $unwind: "$users" },
    {
      $lookup : {
        from: "users",
        localField: "users",
        foreignField: "services.auth0.email",
        as: "userObjects"
      }
    },
    {
      $lookup : {
        from: "students",
        localField: "users",
        foreignField: "email",
        as: "students"
      }
    },
    {
      $group: {
        _id: "$_id",
        target: { $first: "$target_name" },
        score: { $max: "$score" },
        users: { $push: "$users" },
        userObjects: { $push: "$userObjects" },
        students: { $push: "$students" }
      }
    },
    {
      $group: {
        _id: "$users",
        target: { $first: "$target" },
        score: { $max: "$score" }
      }
    },
    {
      $sort: { score: -1 }
    },
    {
      $limit: 100
    }
  ];

  const runAggregation = () => {
    Submissions.aggregate(pipeline).map((e) => {
      e._id = e._id.join(', ');
      this.added('leaders', e._id, e);
    });
    this.ready();
  }

  const query = Submissions.find(selector);
  const handle = query.observeChanges({
    added: (id) => {
      if (!initializing) {
        runAggregation();
      }
    },
    removed: runAggregation,
    changed: runAggregation,
    error: (err) => {
      throw new Meteor.Error('Uh oh! something went wrong!', err.message);
    }
  });

  initializing = false;
  runAggregation();

  this.onStop(function() {
    handle.stop();
  });
});
