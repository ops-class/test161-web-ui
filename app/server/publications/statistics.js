Meteor.publish('statistics', function({ _id: target_name, type }) {
  if (!this.userId) {
    this.ready();
    return;
  }

  let initializing = true;
  const selector = {
    target_name: target_name,
    score: { $gte: 0 }
  };

  const pipeline = [
    { $match: selector },
    {
      $group: {
        _id: "$users",
        users: { $first: "$users" },
        target: { $first: "$target_name" },
        score: { $max: "$score" }
      }
    },
    { $unwind: "$users" },
    {
      $lookup : {
        from: "users",
        localField: "users",
        foreignField: "services.auth0.email",
        as: "userObjects"
      }
    },
    { $unwind: "$userObjects" },
    {
      $group: {
        _id: "$_id",
        target: { $first: "$target" },
        score: { $max: "$score" },
        userObjects: { $push: "$userObjects" }
      }
    },
    {
      $match: {
        userObjects: {
          $not: {
            $elemMatch: {
              "services.auth0.user_metadata.staff": true
            }
          }
        }
      }
    },
    {
      $group: {
        _id: "$target",
        scores: { $push: "$score" }
      }
    }
  ];

  const runAggregation = () => {
    Submissions.aggregate(pipeline).map((e) => {
      this.added('statistics', e._id, e);
      this.changed('statistics', e._id, e);
    });

    this.ready();
  }

  const changeHandler = {
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
  }

  const query = Submissions.find(selector);
  const handle = query.observeChanges(changeHandler);

  initializing = false;
  runAggregation();

  this.onStop(() => {
    handle.stop();
  });
});
