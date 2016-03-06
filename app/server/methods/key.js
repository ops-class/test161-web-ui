Future = Npm.require('fibers/future');

const keygenEndpoint = process.env.KEYGEN_ENDPOINT ||
Meteor.settings.KEYGEN_ENDPOINT ||
'https://test161.ops-class.org/api-v1/keygen';

Meteor.methods({
  regeneratePublicKey: function({email, token}) {
    const userId = this.userId;
    checkEmailToken({email, token, userId});
    this.unblock();
    const future = new Future();
    HTTP.call('POST', keygenEndpoint, {
      data: {email, token}
    }, (err, res) => {
      if (err) {
        if (res) {
          const {statusCode, content} = res;
          future.throw(new Meteor.Error(statusCode, content));
        } else {
          const {code} = err;
          future.throw(new Meteor.Error(code, 'Internal error'));
        }
      } else {
        future.return(res);
      }
    });
    return future.wait();
  }
})
