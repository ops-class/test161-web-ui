const submissionFields = Object.assign(
  ...SubmissionSchema._firstLevelSchemaKeys.map(key => ({[key]: 1}))
);

findAllSubmissions = (userId, asst, limit = 10) => {
  const user = Meteor.users.findOne(userId);
  const {email, name, picture} = user.services.auth0;
  const selector = {
    users: { $in: [email] }
  };
  if (asst) {
    selector.target_name = asst;
  }
  const options = {
    sort: {submission_time: -1},
    fields: submissionFields,
    limit: limit
  };
  return Submissions.find(selector, options);
}

const testFields = {
  _id: 1,
  name: 1,
  status: 1,
  'commands.id': 1,
  'commands.output.line': 1,
  'commands.output.walltime': 1,
  'commands.output.simtime': 1,
  'commands.status': 1,
  'commands.points_avail': 1,
  'commands.points_earned': 1,
  points_avail: 1,
  points_earned: 1
};

findAllTests = (tests) => {
  const selector = { _id: { $in: tests } };
  const options = { fields: testFields };
  return Tests.find(selector, options);
}

// findAllOutputsWithId = (_id) => {
//   const selector = { belong_to: _id };
//   const options = { sort: { walltime: 1 } };
//   return Outputs.find(selector, options);
// }
//
// findAllOutputsWithIds = (ids) => {
//   const selector = { belong_to: { $in: ids } };
//   const options = {};
//   return Outputs.find(selector, options);
// }
