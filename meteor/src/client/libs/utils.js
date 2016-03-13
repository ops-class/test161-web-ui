import {Meteor} from 'meteor/meteor';
import {SubsManager} from 'meteor/meteorhacks:subs-manager';
import {findOneStudent} from 'libs/query';

const UserSubs = new SubsManager();
const SubmissionSubs = new SubsManager();
const TestSubs = new SubsManager();
const TargetSubs = new SubsManager();
const LeaderboardSubs = new SubsManager();

const subscribeUserData = () => {
    const data = {ready: false};
    const handle = UserSubs.subscribe("userData");
    if (handle.ready()) {
      data.user = Meteor.user();
      data.student = findOneStudent(Meteor.userId());
      data.ready = true;
    }
    return data;
}

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
}

export {
  UserSubs,
  SubmissionSubs,
  TestSubs,
  TargetSubs,
  LeaderboardSubs,
  subscribeUserData,
  logout,
  login,
  isStaff
}
