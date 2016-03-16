import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Students} from '../../libs/collections';
import {getUserByEmail, isStaff} from '../../libs/query';

const validDateString = (date) => (new Date(date)) !== 'Invalid Date' && !isNaN(new Date(date));

const checkDateString = function () {
  if (this.isSet) {
    const valid = validDateString(this.value);
    if (!valid) {
      return 'wrong deadline!';
    }
  }
};

const UserSchema = new SimpleSchema({
  email: {
    type: String,
    label: 'Email address of this user',
    regEx: SimpleSchema.RegEx.Email
  },
  deadline: {
    type: String,
    label: 'Deadline for this user',
    optional: true,
    custom: checkDateString
  }
});

const ScoreRequestSchema = new SimpleSchema({
  target: {
    type: String,
    label: 'Target name'
  },
  deadline: {
    type: String,
    label: 'Deadline for this target',
    optional: true,
    custom: checkDateString
  },
  users: {
    type: [ UserSchema ],
    label: 'Users',
    minCount: 1
  }
});

const checkScoreRequest = (obj) => ScoreRequestSchema.newContext().validate(obj);

const checkStaffByToken = (token) => {
  if (!token) {
    return false;
  }
  const student = Students.findOne({token});
  if (!student) {
    return false;
  }
  const user = getUserByEmail(student.email);
  return isStaff(user);
};

export {checkScoreRequest, ScoreRequestSchema, checkStaffByToken};
