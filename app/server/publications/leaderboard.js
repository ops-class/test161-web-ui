Meteor.publish('leaderboards', function({ _id: target_name, type, points }) {
  if (!this.userId) {
    this.ready();
    return;
  }

  if (type !== 'asst') {
    this.ready();
    return;
  }

  const localCache = new Set();

  let initializing = true;
  const selector = {
    target_name: target_name,
    score: { $gt: 0 }
  };

  const pipeline = [
    { $match: selector },
    {
      $group: {
        _id: "$users",
        users: { $first: "$users" },
        target: { $first: "$target_name" },
        max_score: { $max: "$max_score" },
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
      $lookup : {
        from: "students",
        localField: "users",
        foreignField: "email",
        as: "students"
      }
    },
    { $unwind: "$students" },
    {
      $group: {
        _id: "$_id",
        target: { $first: "$target" },
        score: { $max: "$score" },
        userObjects: { $push: "$userObjects" },
        students: { $push: "$students" }
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
      $project: {
        _id: 1,
        target: 1,
        score: 1,
        students: 1
      }
    },
    {
      $sort: { score: -1 }
    }
  ];

  const runAggregation = () => {
    const leaderSet = new Set();
    const scores = [];

    Submissions.aggregate(pipeline).map((e) => {
      scores.push(e.score);
      if (e.score === points) {
        if (!filterAggregate(e, target_name, type)) {
          return;
        }

        if (localCache.has(e._id)) {
          this.changed('leaders', e._id, e);
        } else {
          this.added('leaders', e._id, e);
          localCache.add(e._id);
        }
        leaderSet.add(e._id);
      }
    });

    for (let id of localCache) {
      if (!leaderSet.has(id)) {
        localCache.delete(id);
        this.removed('leaders', id);
      }
    }

    this.added('leaders', target_name, {scores});
    this.changed('leaders', target_name, {scores});

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

  const studentQuery = Students.find({}, {
    fields: {
      _id: 1,
      email: 1,
      privacy: 1
    }
  });
  const studentHandle = studentQuery.observeChanges(changeHandler);

  initializing = false;
  runAggregation();

  this.onStop(function() {
    handle.stop();
    studentHandle.stop();
  });
});
