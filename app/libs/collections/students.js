Students = new Mongo.Collection('students');

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
  hide: {
    type: Boolean,
    label: "Hide from the leader board",
    optional: true
  },
  anonymous: {
    type: Boolean,
    label: "Show name on leader board but anonymous",
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
