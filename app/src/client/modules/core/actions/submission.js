export default {
  toggleSubmission({Meteor}, _id, {email, token}) {
    Meteor.call('toggleSubmission', _id, {email, token}, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};
