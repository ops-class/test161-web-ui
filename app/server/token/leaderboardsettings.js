Meteor.methods({
  toggleHide: function({email, token}) {
    const userId = this.userId;
    const student = checkEmailToken({email, token, userId});
    let {hide} = student;
    hide = !hide;
    return Students.update({_id: student._id}, {$set: {hide} });
  },
  toggleAnonymous: function({email, token}) {
    const userId = this.userId;
    const student = checkEmailToken({email, token, userId});
    let {anonymous} = student;
    anonymous = !anonymous;
    return Students.update({_id: student._id}, {$set: {anonymous} });
  }
})
