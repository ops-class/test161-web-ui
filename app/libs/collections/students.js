Students = new Mongo.Collection('students');

HIDE = 'Hide';
ANONYMOUS = 'Anonymous';
SHOW = 'Show';
PrivacyChoices = [HIDE, ANONYMOUS, SHOW];

PrivacySchema = new SimpleSchema({
  type: {
    type: String,
    label: "Target type or user email"
  },
  choice: {
    type: String,
    label: "User's choice",
    allowedValues: PrivacyChoices
  }
});

TargetStatSchema = new SimpleSchema({
  target_name: {
    type: String,
    label: "Target name"
  },
  target_version: {
    type: Number,
    label: "Target version"
  },
  target_type: {
    type: String,
    label: "Target type"
  },
  max_score: {
    type: Number,
    label: "Max score"
  },
  total_submissions: {
    type: Number,
    label: "Total submissions"
  },
  high_score: {
    type: Number,
    label: "High score"
  }
});

StudentSchema = new SimpleSchema({
  _id: {
    type: String,
    label: "id",
    regEx: SimpleSchema.RegEx.Id
  },
  userId: {
    type: String,
    label: "user ID",
    regEx: SimpleSchema.RegEx.Id
  },
  email: {
    type: String,
    label: "Email address",
    regEx: SimpleSchema.RegEx.Email
  },
  token: {
    type: String,
    label: "token",
    regEx: SimpleSchema.RegEx.Id
  },
  total_submissions: {
    type: Number,
    label: "Total Submission",
    optional: true
  },
  target_stats: {
    type: [TargetStatSchema],
    label: "Target stats",
    optional: true
  },
  key: {
    type: String,
    label: "Public key",
    optional: true
  },
  createdAt: {
    type: Date,
    label: "Create at"
  },
  privacy: {
    type: [PrivacySchema],
    label: "Privacy settings",
    minCount: 2,
    maxCount: 2,
    optional: true
  },
  debug: {
    type: Boolean,
    label: "Debug",
    optional: true,
    defaultValue: false
  }
});

Students.attachSchema(StudentSchema);
