import {SimpleSchema} from 'meteor/aldeed:simple-schema';

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
  group_size: {
    type: Number,
    label: 'Only match the submission with specific group size',
    min: 1,
    optional: true
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

export {ScoreRequestSchema};
