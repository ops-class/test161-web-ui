Meteor.loginAsDebug = function(password = 'admin-password', callback) {
  var loginRequest = {debug: true, password: password};

  Accounts.callLoginMethod({
    methodArguments: [loginRequest],
    userCallback: callback
  });
};

Meteor.call('isDebug', function(err, debug) {
  if (err) {
    return;
  } else if (debug) {
    Meteor.loginAsDebug();
  }
});
