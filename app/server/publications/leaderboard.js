Meteor.publish('leaderboards', function({ _id: target_name, type }) {
  if (!this.userId) {
    this.ready();
    return;
  }

  const LEADERS_CACHE = {};

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
    {
      $project: { _id: 1, users: 1, target: 1, score: 1,
        cmpToMax: { $cmp: [ "$score", "$max_score" ] }
      }
    },
    { $match: { cmpToMax: 0 } },
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
    },
    {
      $limit: 100
    }
  ];

  const runAggregation = () => {
    if (!LEADERS_CACHE[target_name]) {
      LEADERS_CACHE[target_name] = new Set();
    }

    const leaderSet = new Set();

    Submissions.aggregate(pipeline).map((e) => {
      const group = e._id.join(', ');
      e._id = hash(group);
      e.group = [];
      for (let student of e.students) {
        if (isHide(student.privacy, type)) {
          return;
        }
        if (isAnonymous(student.privacy, type)) {
          e.group.push('anonymous');
        } else {
          e.group.push(student.email);
        }
      }
      e.group = e.group.join(', ');
      delete e.students;

      if (LEADERS_CACHE[target_name].has(e._id)) {
        this.changed('leaders', e._id, e);
      } else {
        this.added('leaders', e._id, e);
      }
      leaderSet.add(e._id);
      LEADERS_CACHE[target_name].add(e._id);
    });

    for (let id of LEADERS_CACHE[target_name]) {
      if (!leaderSet.has(id)) {
        LEADERS_CACHE[target_name].delete(id);
        this.removed('leaders', id);
      }
    }
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

  return Leaders.find({});
});
