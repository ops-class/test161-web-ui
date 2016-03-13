import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const Students = new Mongo.Collection('students');

const HIDE = 'Hide';
const ANONYMOUS = 'Anonymous';
const SHOW = 'Show';
const PrivacyChoices = [ HIDE, ANONYMOUS, SHOW ];

const PrivacySchema = new SimpleSchema({
  type: {
    type: String,
    label: 'Target type or user email'
  },
  choice: {
    type: String,
    label: 'User privacy choice',
    allowedValues: PrivacyChoices
  }
});

const TargetStatSchema = new SimpleSchema({
  target_name: {
    type: String,
    label: 'Target name'
  },
  target_version: {
    type: Number,
    label: 'Target version'
  },
  target_type: {
    type: String,
    label: 'Target type'
  },
  max_score: {
    type: Number,
    label: 'Max score'
  },
  total_submissions: {
    type: Number,
    label: 'Total submissions'
  },
  high_score: {
    type: Number,
    label: 'High score'
  }
});

const StudentSchema = new SimpleSchema({
  _id: {
    type: String,
    label: 'id',
    regEx: SimpleSchema.RegEx.Id
  },
  userId: {
    type: String,
    label: 'user ID',
    regEx: SimpleSchema.RegEx.Id
  },
  email: {
    type: String,
    label: 'Email address',
    regEx: SimpleSchema.RegEx.Email
  },
  token: {
    type: String,
    label: 'token',
    regEx: SimpleSchema.RegEx.Id
  },
  total_submissions: {
    type: Number,
    label: 'Total Submission',
    optional: true
  },
  target_stats: {
    type: [ TargetStatSchema ],
    label: 'Target stats',
    optional: true
  },
  key: {
    type: String,
    label: 'Public key',
    optional: true
  },
  createdAt: {
    type: Date,
    label: 'Create at'
  },
  privacy: {
    type: [ PrivacySchema ],
    label: 'Privacy settings',
    minCount: 2,
    maxCount: 2,
    optional: true
  },
  name: {
    type: String,
    label: 'Student name',
    optional: true
  },
  link: {
    type: String,
    label: 'Student link',
    regEx: SimpleSchema.RegEx.Url,
    optional: true
  },
  debug: {
    type: Boolean,
    label: 'Debug',
    optional: true,
    defaultValue: false
  }
});

Students.attachSchema(StudentSchema);

export {
  Students,
  HIDE,
  ANONYMOUS,
  SHOW,
  PrivacyChoices,
  PrivacySchema
};
