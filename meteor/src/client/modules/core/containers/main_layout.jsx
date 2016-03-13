import MainLayout from '../components/main_layout.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({params, context}, onData) => {
  const {Libs: {UserSubs, findOneStudent}} = context();
  const data = {params, ready: false};
  const handle = UserSubs.subscribe("userData");
  if (handle.ready()) {
    data.user = Meteor.user();
    data.student = findOneStudent(Meteor.userId());
    data.ready = true;
  }
  onData(null, data);
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(MainLayout);
