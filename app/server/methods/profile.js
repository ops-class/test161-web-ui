Meteor.methods({
  updateProfile: function({email, token}, {name, link}) {
    const userId = this.userId;
    const student = checkEmailToken({email, token, userId});
    const obj = {};
    if (name !== undefined) { obj.name = name; }
    if (link !== undefined) { obj.link = link; }
    return Students.update(
      {_id: student._id},
      {$set: obj},
      { trimStrings: false }
    );
  }
})
