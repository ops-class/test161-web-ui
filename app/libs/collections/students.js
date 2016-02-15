Students = new Mongo.Collection('students');

StudentSchema = new SimpleSchema({
  _id: {
    type: String,
    label: "id",
    regEx: SimpleSchema.RegEx.Id
  },
  userId: {
    type: String,
    label: "user ID",
    regEx: SimpleSchema.RegEx.Id
  },
  email: {
    type: String,
    label: "Email address",
    regEx: SimpleSchema.RegEx.Email
  },
  token: {
    type: String,
    label: "token",
    regEx: SimpleSchema.RegEx.Id
  },
  createdAt: {
    type: Date,
    label: "Create at"
  }
});

Students.attachSchema(StudentSchema);
