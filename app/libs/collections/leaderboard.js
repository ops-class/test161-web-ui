Leaders = new Mongo.Collection('leaders');
LeaderSchema = new SimpleSchema({
  _id: {
    type: String,
    label: "Group name, either two emails concat together or one email"
  },
  score: {
    type: Number,
    label: "Highest score for this group"
  },
  target: {
    type: String,
    label: "Target name"
  }
});

Leaders.attachSchema(LeaderSchema)
