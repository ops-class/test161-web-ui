import {Mongo} from 'meteor/mongo';

const Targets = new Mongo.Collection('targets');
const TargetNames = new Mongo.Collection('targetnames');
const TRUE_FALSE = ['true', 'false'];

const TargetSchema = new SimpleSchema({
  _id: {
    type: String,
    label: "Target id",
    regEx: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
  },
  name: {
    type: String,
    label: "Target name",
  },
  print_name: {
    type: String,
    label: "Target print name",
  },
  description: {
    type: String,
    label: "Target description",
  },
  active: {
    type: String,
    label: "Targer is active",
    allowedValues: TRUE_FALSE
  },
  leaderboard: {
    type: String,
    label: "Whether show target on leaderboard",
    allowedValues: TRUE_FALSE
  },
  version: {
    type: Number,
    label: "Target version"
  },
  type: {
    type: String,
    label: "Target type"
  },
  points: {
    type: Number,
    label: "Target total score"
  },
  kconfig: {
    type: String,
    label: "Target kconfig"
  },
  userland: {
    type: Boolean,
    label: "Targer whether contains userland binary"
  },
  file_hash: {
    type: String,
    label: "Targer file hash"
  },
  // tests: {
  //   type: [],
  //   label: "tests"
  // },
  file_name: {
    type: String,
    label: "Targer file name"
  }
});

Targets.attachSchema(TargetSchema);

export default {
  Targets,
  TargetNames
}
