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
  },
  updateSubmissionPrivacy(_id, {email, token, choice}) {
    check(_id, String);
    if (!this.userId) {
      throw new Meteor.Error(401, "not login!");
    }
    if (PrivacyChoices.indexOf(choice) > -1) {
      throw new Meteor.Error(400, `Bad choice: ${choice}`);
    }
    const userId = this.userId;
    const student = checkEmailToken({email, token, userId});
    const submission = Submissions.findOne({_id: _id, users: { $in: [email] }});
    if (!submission) {
      throw new Meteor.Error(404, "Submission not found!");
    }
    const {users, privacy = []} = submission;
    const index = users.indexOf(email);
    if (privacy.length === 0) {
      // TODO: insert new
    } else {
      // TODO: update, still need check whether exists
    }
    return Submissions.update({_id}, { $set: { privacy } });
  }
});
