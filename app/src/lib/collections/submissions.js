import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {PrivacySchema} from './students';

const Submissions = new Mongo.Collection('submissions');

const submissionStatus = [ 'submitted', 'building', 'running', 'completed', 'aborted' ];
const targetNames = [ 'asst1', 'asst2', 'asst3' ];

const SubmissionSchema = new SimpleSchema({
  _id: {
    type: String,
    label: 'id',
    regEx: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
  },
  submission_time: {
    type: Date,
    label: 'Submision Time'
  },
  users: {
    type: [ String ],
    label: 'Users',
    regEx: SimpleSchema.RegEx.Email,
    min: 1,
    minCount: 1,
    maxCount: 2
  },
  repository: {
    type: String,
    label: 'Repository'
  },
  commit_id: {
    type: String,
    label: 'Commit ID'
  },
  target: {
    type: String,
    label: 'Target _id'
  },
  target_name: {
    type: String,
    label: 'Target Name'
  },
  target_type: {
    type: String,
    label: 'Target Type'
  },
  target_version: {
    type: Number,
    label: 'Target Version'
  },
  max_score: {
    type: Number,
    label: 'Target maximum score',
    min: 1
  },
  tests: {
    type: [ String ],
    label: 'Tests',
    // regEx: SimpleSchema.RegEx.Id,
    min: 0,
    regEx: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
  },
  status: {
    type: String,
    label: 'Status',
    allowedValues: submissionStatus
  },
  completion_time: {
    type: Date,
    label: 'Completion Time',
    optional: true
  },
  privacy: {
    type: [ PrivacySchema ],
    label: 'Submission privacy settings',
    minCount: 1,
    maxCount: 2,
    optional: true
  },
  hide: {
    type: Boolean,
    label: 'Hide from submission list',
    optional: true
  },
  score: {
    type: Number,
    label: 'Number',
    optional: true,
    min: 0
  },
  performance: {
    type: Number,
    label: 'Performance',
    decimal: true,
    optional: true
  }
});

Submissions.attachSchema(SubmissionSchema);

const isCompleted = (status) => status === 'completed';

const isFailed = (status) => status === 'failed';

const isSubmitted = (status) => status === 'submitted';

export {
  Submissions,
  submissionStatus,
  SubmissionSchema,
  targetNames,
  isCompleted,
  isFailed,
  isSubmitted
};
