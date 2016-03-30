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

const getString = (len, base) => {
  return len <= 1 ? base : base + 's';
};

const getGroupString = (len) => getString(len, 'group');

const getAsstLeaderTitle = ({total = 0, length = 0}) => {
  if (total === 0) {
    return '';
  }
  if (length === 0) {
    return '';
  }
  return (
    <span>
      Perfect score: <strong>{total}</strong>, showing: <strong>
        {length}
      </strong>
    </span>
  );
};

export {
  getAsstLeaderTitle,
  getGroupString,
  UserSubs,
  SubmissionSubs,
  TestSubs,
  TargetSubs,
  LeaderboardSubs,
  logout,
  login
};
