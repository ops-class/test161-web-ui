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

const getGroupString = (len) => {
  if (len <= 1) {
    return 'group';
  }
  return 'groups';
};

const getAsstLeaderTitle = ({total = 0, length = 0}) => {
  if (total === 0) {
    return '';
  }
  if (length === 0) {
    return '';
  }
  return (
    <span>
      <strong>
        {total}
      </strong> {getGroupString(total)} got a perfect score, <strong>
        {length}
      </strong> {getGroupString(length)} {length <= 1 ? 'is' : 'are'} showing!
    </span>
  );
};

export {
  getAsstLeaderTitle,
  UserSubs,
  SubmissionSubs,
  TestSubs,
  TargetSubs,
  LeaderboardSubs,
  logout,
  login
};
