findAllSubmissions = (userId, asst) => {
  const user = Meteor.users.findOne(userId);
  const {email, name, picture} = user.services.auth0;
  const selector = {
    users: { $in: [email] }
  };
  if (asst) {
    selector.target_name = asst;
  }
  const options = {
    sort: {submission_time: -1}
  };
  return Submissions.find(selector, options);
}

findAllTests = (tests) => {
  const selector = { _id: { $in: tests } };
  const options = {};
  return Tests.find(selector, options);
}

findAllOutputsWithId = (_id) => {
  const selector = { belong_to: _id };
  const options = { sort: { walltime: 1 } };
  return Outputs.find(selector, options);
}

findAllOutputsWithIds = (ids) => {
  const selector = { belong_to: { $in: ids } };
  const options = {};
  return Outputs.find(selector, options);
}
