import {Meteor} from 'meteor/meteor';
import {getUserEmail, findAllStudents} from 'libs/query';

const generateStudentDoc = (userId) => {
  const email = getUserEmail(userId);
  const _id = Random.id();
  const token = Random.id();
  const createdAt = new Date();
  const target_stats = [];
  const student = {_id, userId, email, token, createdAt, target_stats};
  Students.insert(student);
  // Meteor.call('regeneratePublicKey', {email, token});
}

Meteor.publish("userData", function() {
  if (this.userId) {
    const selector = {_id: this.userId};
    const options = {fields: {'services': 1, 'profile': 1}};
    const studentCursor = findAllStudents(this.userId);
    if (studentCursor.count() === 0) {
      generateStudentDoc(this.userId);
    }
    return [
      Meteor.users.find(selector, options),
      studentCursor
    ];
  } else {
    this.ready();
  }
});
