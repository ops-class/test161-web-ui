import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const showAction = 'show';
const hideAction = 'hide';
const actions = [ showAction, hideAction ];

const HiddenUserSchema = new SimpleSchema({
  email: {
    type: String,
    label: 'Email address of this user',
    regEx: SimpleSchema.RegEx.Email
  },
  action: {
    type: String,
    label: 'Action apply to this user',
    allowedValues: actions,
    optional: true
  }
});

const HiddenRequestSchema = new SimpleSchema({
  target: {
    type: String,
    label: 'Target name'
  },
  users: {
    type: [ HiddenUserSchema ],
    label: 'Users',
    minCount: 1
  },
  action: {
    type: String,
    label: 'Action apply to this user',
    allowedValues: actions,
    optional: true
  }
});

export {HiddenRequestSchema, showAction, hideAction, actions};
