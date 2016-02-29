Statistics = new Mongo.Collection('statistics');

StatisticsSchema = new SimpleSchema({
  _id: {
    type: String,
    label: "Target name"
  },
  scores1: {
    type: [Number],
    label: "Scores array of all groups"
  }
});

Statistics.attachSchema(StatisticsSchema)
