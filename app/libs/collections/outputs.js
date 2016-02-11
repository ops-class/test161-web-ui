// Outputs = new Mongo.Collection('outputs');
//
// OutputSchema = new SimpleSchema({
//   belong_to: {
//     type: String,
//     label: "Belong to"
//   },
//   line: {
//     type: String,
//     label: "line"
//   },
//   walltime: {
//     type: Number,
//     label: "Wall time",
//     decimal: true,
//     min: 0
//   },
//   simtime: {
//     type: Number,
//     label: "Wall time",
//     decimal: true,
//     min: 0
//   }
// });
//
// Outputs.attachSchema(OutputSchema);
//
// generateOutput = ({_id, num = 2}) => {
//   for (let i = 0; i < num; i++) {
//     const belong_to = _id;
//     console.log(belong_to, _id);
//     const line = 'line ' + i;
//     const walltime = 0.1 * i;
//     const simtime = walltime;
//     Meteor.setTimeout(() => {
//       console.log('insert output for command:', belong_to);
//       Outputs.insert({line, belong_to, walltime, simtime});
//     }, 1000 * i);
//   }
// }
