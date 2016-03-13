import {Meteor} from 'meteor/meteor';
import {checkEmailToken} from './check';
import {Students} from 'libs/collections';

Meteor.methods({
  regenerateToken: function({email, token}) {
    // Meteor._sleepForMs(5000);
    const userId = this.userId;
    const student = checkEmailToken({email, token, userId});
    const newToken = Random.id();
    return Students.update({_id: student._id}, {$set: { token: newToken } });
  }
})
