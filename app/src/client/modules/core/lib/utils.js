import {Meteor} from 'meteor/meteor';
import {SubsManager} from 'meteor/meteorhacks:subs-manager';

const UserSubs = new SubsManager();
const SubmissionSubs = new SubsManager();
const TestSubs = new SubsManager();
const TargetSubs = new SubsManager();
const LeaderboardSubs = new SubsManager();

import Highcharts from 'highcharts/highstock';

Highcharts.setOptions({
  chart: {
    style: {
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
    }
  }
});

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
      <h3>{total} Perfect {scores}</h3>
      <h4>({shown} Shown)</h4>
    </div>
  );
};

// TODO: remove after target collection update
const targetLinkMap = {
  asst0: 'https://www.ops-class.org/asst/0/',
  asst1: 'https://www.ops-class.org/asst/1/',
  asst2: 'https://www.ops-class.org/asst/2/',
  asst3: 'https://www.ops-class.org/asst/3/',
  'asst1-perf': 'https://www.ops-class.org/asst/1/',
  'asst2-perf': 'https://www.ops-class.org/asst/2/',
  'asst3-perf': 'https://www.ops-class.org/asst/3/',
};

const noTargetLink = 'https://www.ops-class.org/asst/overview/';

const getTargetLink = ({ _id: name, link }) => {
  console.log(name);
  if (link) {
    return link;
  }
  return targetLinkMap[name.toLowerCase()] || noTargetLink;
};

export {
  getAsstLeaderTitle,
  getTargetLink,
  getGroupString,
  UserSubs,
  SubmissionSubs,
  TestSubs,
  TargetSubs,
  LeaderboardSubs,
  logout,
  login
};
