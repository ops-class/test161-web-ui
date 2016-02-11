Meteor.publish("outputs", function(ids) {
  if (this.userId) {
    // Meteor._sleepForMs(1000);
    // return findAllOutputsWithId(_id);
    return findAllOutputsWithIds(ids);
  } else {
    this.ready();
  }
});
