Meteor.publish("userData", function() {
  console.log('userData', this.userId);
  if (this.userId) {
    const selector = {_id: this.userId};
    const options = {fields: {'services': 1, 'profile': 1}};
    return Meteor.users.find(selector, options);
  } else {
    this.ready();
  }
});
