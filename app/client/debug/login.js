Meteor.loginAsDebug = function(password = 'admin-password', callback) {
  var loginRequest = {debug: true, password: password};

  Accounts.callLoginMethod({
    methodArguments: [loginRequest],
    userCallback: callback
  });
};

Meteor.call('isDebug', function(err, debug) {
  if (err) {
    console.log(err);
  } else if (debug) {
    Meteor.loginAsDebug();
  }
});
