const LEADERS_CACHE = {};

const hash = (name) => {
  return CryptoJS.MD5(name).toString();
}

Meteor.publish('leaderboards', function(target_name) {
  if (!this.userId) {
    this.ready();
    return;
  }

  let initializing = true;
  const deadline = getDeadline(target_name);
  const selector = {
    target_name: target_name,
    submission_time: { $lte: deadline },
    score: { $gt: 0 }
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
        },
        students: {
          $not: {
            $elemMatch: {
              hide: true
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
      e.group = group;
      e._id = hash(group);
      for (let student of e.students) {
        if (student.anonymous) {
          e.group = 'anonymous';
        }
      }
      delete e.students;

      if (LEADERS_CACHE[target_name].has(e._id)) {
        // if directly call changed, some client don't have the e._id doc before
        // if only call added, they wouldn't update when change anonymous
        this.added('leaders', e._id, e);
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
        // make sure remove stale data, because publish doesn't know
        // which client has the e._id
        this.added('leaders', id, {_id: id, score: 0, target: 'target'});
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
      hide: 1,
      anonymous: 1
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
