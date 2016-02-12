Tests = new Mongo.Collection('tests');

commandStatus = ['none', 'running', 'correct', 'incorrect'];
testStatus = ['none', 'running', 'correct', 'incorrect', 'abort', 'skip'];

OutputSchema = new SimpleSchema({
  line: {
    type: String,
    label: "line"
  },
  walltime: {
    type: Number,
    label: "Wall time",
    decimal: true,
    min: 0
  },
  simtime: {
    type: Number,
    label: "Wall time",
    decimal: true,
    min: 0
  }
});

CommandSchema = new SimpleSchema({
  _id: {
    type: String,
    label: "id",
    regEx: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
  },
  output: {
    type: [OutputSchema],
    label: "Outputs"
  },
  status: {
    type: String,
    label: "status",
    allowedValues: commandStatus
  },
  points_avail: {
    type: Number,
    label: "Available points"
  },
  points_earned: {
    type: Number,
    label: "Earned points"
  }
});

TestSchema = new SimpleSchema({
  _id: {
    type: String,
    label: "id",
    regEx: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
  },
  name: {
    type: String,
    label: "Name"
  },
  status: {
    type: String,
    label: "Status",
    allowedValues: testStatus
  },
  commands: {
    type: [CommandSchema],
    label: "Commands"
  },
  points_avail: {
    type: Number,
    label: "Available points"
  },
  points_earned: {
    type: Number,
    label: "Earned points"
  }
});

Tests.attachSchema(TestSchema);
