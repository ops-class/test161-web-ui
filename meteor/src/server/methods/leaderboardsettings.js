import {Meteor} from 'meteor/meteor';
import {checkEmailToken} from './check';
import {Students, HIDE, ANONYMOUS} from 'libs/collections';

Meteor.methods({
  updatePrivacy: function({email, token, type}, newChoice) {
    // Meteor._sleepForMs(1000);
    const userId = this.userId;
    const student = checkEmailToken({email, token, userId});
    let {privacy} = student;
    if (!privacy) {
      privacy = [
        { type: 'asst', choice: HIDE },
        { type: 'perf', choice: ANONYMOUS }
      ];
    }
    const setting = privacy.find(x => x.type === type);
    setting.choice = newChoice;
    return Students.update({_id: student._id},
      { $set: { privacy } }
    );
  }
})
