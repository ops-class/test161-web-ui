import {Meteor} from 'meteor/meteor';
import {findAllSubmissions} from 'lib/query';

Meteor.publish('submissions', function (asst, limit = 10) {
  if (this.userId) {
    // Meteor._sleepForMs(2000);
    return findAllSubmissions(this.userId, asst, limit);
  }
  this.ready();
});
