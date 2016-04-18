import {Submissions} from '../../../lib/collections';

const queryOneScore = (target_name, deadline, user) => {
  const {email, group_size} = user;
  const time = user.deadline ? new Date(user.deadline) : deadline;

  const selector = {
    target_name,
    users: {$in: [ email ]},
    submission_time: {$lte: time},
    score: {$gt: 0}
  };

  if (group_size) {
    selector.users.$size = group_size;
  }

  const pipeline = [
    { $match: selector },
    { $sort: { submission_time: -1 } },
    {
      $project: {
        _id: 1,
        score: 1,
        submission: {
          _id: '$_id',
          users: '$users',
          submission_time: '$submission_time',
          score: '$score'
        }
      }
    },
    {
      $group: {
        _id: email,
        maxScore: {$max: '$score'},
        submissions: {$push: '$submission'}
      }
    },
    { $unwind: '$submissions' },
    {
      $project: {
        _id: 1,
        submissions: 1,
        maxScore: 1,
        cmp: { $cmp: [ '$maxScore', '$submissions.score' ] }
      }
    },
    { $match: { cmp: { $eq: 0 } } },
    { $sort: { 'submissions.submission_time': -1} },
    { $limit: 1 },
    {
      $lookup: {
        from: 'submissions',
        localField: 'submissions._id',
        foreignField: '_id',
        as: 'submission'
      }
    },
    { $unwind: '$submission' },
    { $unwind: '$submission.tests' },
    {
      $lookup: {
        from: 'tests',
        localField: 'submission.tests',
        foreignField: '_id',
        as: 'tests'
      }
    },
    { $unwind: '$tests' },
    {
      $project: {
        _id: 1,
        submissions: 1,
        'tests.name': 1,
        'tests.points_earned': 1,
        'tests.points_avail': 1,
      }
    },
    {
      $group: {
        _id: '$_id',
        submissions: { $first: '$submissions' },
        tests: { $push: '$tests' },
      }
    },
  ];

  const results = Submissions.aggregate(pipeline).map((e) => {
    const {_id, submission_time, users, score} = e.submissions;
    const {tests} = e;
    return {_id, email, users, score, submission_time, tests};
  });

  if (results.length === 1) {
    return results[0];
  }

  return {email};
};

const queryScores = ({target, users, deadline}) => {
  const results = users.map(user => queryOneScore(target, deadline, user));
  return results;
};

export {queryScores};
