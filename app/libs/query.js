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
