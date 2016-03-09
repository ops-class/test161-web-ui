Meteor.methods({
  updateProfile: function({email, token, name, link}) {
    const userId = this.userId;
    const student = checkEmailToken({email, token, userId});
    return Students.update({_id: student._id}, {$set: { name, link } });
  }
})
