Meteor.publish("tests", function(tests) {
  if (this.userId) {
    return findAllTests(tests);
  } else {
    this.ready();
  }
});
