import {Meteor} from 'meteor/meteor';
import {Students} from 'libs/collections';
import {getUserEmail} from 'libs/query';

const checkEmailToken = ({email, token, userId}) => {
  if (!email || !token) {
    throw new Meteor.Error(400, 'Email or Token are illegal value!');
  }
  if (userId) {
    const userEmail = getUserEmail(userId);
    if (userEmail !== email) {
      throw new Meteor.Error(403, `Email ${email} not match!`);
    }
    const student = Students.findOne({email});
    if (!student) {
      throw new Meteor.Error(404, 'Your profile not found!');
    }
    const preToken = student.token;
    if (preToken !== token) {
      throw new Meteor.Error(403, 'Your token already changed!');
    }
    return student;
  }
  throw new Meteor.Error(401, 'not login!');
};

export default {checkEmailToken};
