const DEBUG = process.env.TEST161_DEBUG || Meteor.settings.TEST161_DEBUG;
if (DEBUG) {
  Accounts.registerLoginHandler(function(loginRequest) {
    if(!loginRequest.debug) {
      return undefined;
    }

    if(loginRequest.password != 'admin-password') {
      return null;
    }

    let userId = null;
    let user = Meteor.users.findOne({username: 'admin'});
    if(!user) {
      const id = Random.id();
      user = {
        username: 'admin',
        createdAt: new Date(),
        services: {
          auth0: {
            email: 'admin@ops-class.org',
            email_verified: true,
            user_id: 'auth0|' + id,
            name: 'admin@ops-class.org',
            nickname: 'admin',
            global_client_id: 'Rf8od4jJNfYw7DGfjPMQLfxXb7MjS3pP',
            id: 'auth0|' + id
          },
          resume: { loginTokens: [] }
        }
      }
      userId = Meteor.users.insert(user);
    } else {
      userId = user._id;
    }

    return {userId};
  });

  Meteor.methods({
    isDebug: function() {
      return DEBUG;
    }
  });
}
