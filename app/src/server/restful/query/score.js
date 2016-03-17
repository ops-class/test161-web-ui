import {Submissions} from '../../../libs/collections';

const queryOneScore = (target_name, deadline, user) => {
  const {email} = user;
  const time = user.deadline ? new Date(user.deadline) : deadline;

  const selector = {
    target_name,
    users: {$in: [ email ]},
    submission_time: {$lte: time},
    score: {$gt: 0}
  };

  const pipeline = [
    { $match: selector },
    { $sort: { submission_time: -1 } },
    {
      $project: {
        _id: 1,
        score: 1,
        submission: {
          _id: '$_id',
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
    { $limit: 1 }
  ];

  const results = Submissions.aggregate(pipeline).map((e) => {
    const {_id, submission_time, score} = e.submissions;
    return {_id, email, score, submission_time};
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
