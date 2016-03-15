import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const Leaders = new Mongo.Collection('leaders');

const LeaderSchema = new SimpleSchema({
  _id: {
    type: String,
    label: 'Leader id, md5 of their group name'
  },
  group: {
    type: String,
    label: 'Group name, two emails concat together, one email, or anonymous'
  },
  score: {
    type: Number,
    label: 'Highest score for this group'
  },
  target: {
    type: String,
    label: 'Target name'
  }
});

Leaders.attachSchema(LeaderSchema);

export default {Leaders};
