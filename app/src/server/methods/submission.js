import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {checkEmailToken} from './check';
import {Submissions} from 'lib/collections';

Meteor.methods({
  toggleSubmission(_id, {email, token}) {
    check(_id, String);
    if (!this.userId) {
      throw new Meteor.Error(401, 'not login!');
    }
    const userId = this.userId;
    checkEmailToken({email, token, userId});
    const submission = Submissions.findOne({_id, users: { $in: [ email ] }});
    if (!submission) {
      throw new Meteor.Error(404, 'Submission not found!');
    }
    const hide = !submission.hide;
    return Submissions.update({_id}, { $set: { hide } });
  }
});
