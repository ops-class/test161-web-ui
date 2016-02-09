Meteor.publish('submissions', function(asst) {
  if (this.userId) {
    // Meteor._sleepForMs(2000);
    return findAllSubmissions(this.userId, asst);
  } else {
    this.ready();
  }
});
