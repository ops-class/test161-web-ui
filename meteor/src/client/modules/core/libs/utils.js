import {Meteor} from 'meteor/meteor';
import {SubsManager} from 'meteor/meteorhacks:subs-manager';

const UserSubs = new SubsManager();
const SubmissionSubs = new SubsManager();
const TestSubs = new SubsManager();
const TargetSubs = new SubsManager();
const LeaderboardSubs = new SubsManager();

const logout = () => {
  Meteor.logout();
};

const login = () => {
  if (Meteor.lock.$container) {
    Meteor.lock.hide();
  }
  Meteor.lock.show({
    closable: true
  });
};

const isStaff = (user) => {
  return ((((user || {}).services || {}).auth0 || {}).user_metadata || {}).staff;
};

export {
  UserSubs,
  SubmissionSubs,
  TestSubs,
  TargetSubs,
  LeaderboardSubs,
  logout,
  login,
  isStaff
};
