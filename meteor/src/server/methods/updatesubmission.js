import {Meteor} from 'meteor/meteor';
import {checkEmailToken} from './check';
import {Submissions, PrivacyChoices} from 'libs/collections';

Meteor.methods({
  updateSubmissionPrivacy(_id, {email, token, choice}) {
    check(_id, String);
    if (!this.userId) {
      throw new Meteor.Error(401, "not login!");
    }
    if (PrivacyChoices.indexOf(choice) === -1) {
      throw new Meteor.Error(400, `Bad choice: ${choice}`);
    }
    const userId = this.userId;
    const student = checkEmailToken({email, token, userId});
    const submission = Submissions.findOne({_id: _id, users: { $in: [email] }});
    if (!submission) {
      throw new Meteor.Error(404, "Submission not found!");
    }
    const {users, privacy = []} = submission;
    const userSetting = privacy.find(x => x.type === email);
    if (userSetting) {
      userSetting.choice = choice;
    } else {
      privacy.push({type: email, choice: choice});
    }
    return Submissions.update({_id}, { $set: { privacy } });
  }
});
