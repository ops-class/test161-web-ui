Meteor.publish('submissions', function () {
  const selector = {};
  const options = {
      sort: {submission_time: -1}
  };
  return Submissions.find(selector);
});
