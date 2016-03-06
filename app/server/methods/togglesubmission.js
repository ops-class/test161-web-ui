Meteor.methods({
  toggleSubmission(_id) {
    check(_id, String);
    if (!this.userId) {
      throw new Meteor.Error(401, "not login!");
    }
    const email = getUserEmail(this.userId);
    const submission = Submissions.findOne({_id: _id, users: { $in: [email] }});
    if (!submission) {
      throw new Meteor.Error(404, "Submission not found!");
    }
    let {hide = false} = submission;
    hide = !hide;
    return Submissions.update({_id}, { $set: { hide } });
  }
});
