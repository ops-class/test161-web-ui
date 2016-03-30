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
  let scores = (total === 1) ? 'Score' : 'Scores';
  if (total === length) {
    return (
      <h3>{total} Perfect {scores}</h3>
    );
  }
  let shown = (length === 0) ? 'None' : length;
  return (
    <div>
      <h3 className="leaders-title">{total} Perfect {scores}</h3>
      <h4>({shown} Shown)</h4>
    </div>
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
