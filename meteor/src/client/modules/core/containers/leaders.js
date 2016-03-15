import {LeadersComponent} from '../components/leaders';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {
    Collections: {TargetNames},
    Libs: {TargetSubs}
  } = context();

  const ready = false;
  const loading = true;
  let data = {ready, loading};

  const handle = TargetSubs.subscribe('targets');

  data.targets = TargetNames.find(
    {}, {sort: {type: -1, _id: 1}}
  ).fetch();

  if (handle.ready()) {
    data.ready = true;
    data.loading = false;
  } else {
    data.ready = data.targets.length > 0;
    data.loading = true;
  }
  console.log(data);

  onData(null, {data});
};

export const depsMapper = (context, actions) => {
  const {currentLimit, increaseLimit, clearLimit} = actions.submissionlist;
  return {
    currentLimit, increaseLimit, clearLimit,
    context: () => context
  };
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(LeadersComponent);
