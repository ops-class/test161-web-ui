import {Meteor} from 'meteor/meteor';
import {findAllTests} from 'lib/query';

Meteor.publish('tests', function (tests) {
  if (this.userId) {
    return findAllTests(tests);
  }
  this.ready();
});
