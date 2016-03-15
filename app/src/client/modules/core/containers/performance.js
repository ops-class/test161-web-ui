import {PerformanceComponent} from '../components/leaders/performance';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, target}, onData) => {
  const {
    Collections: {Leaders}, Libs: {LeaderboardSubs}
  } = context();

  const ready = false;
  const loading = true;
  let data = {ready, loading};
  const handle = LeaderboardSubs.subscribe('performance', target);
  data.leaders = Leaders.find(
    { target: target._id },
    { sort: { performance: 1, submission_time: -1 } }
  ).fetch();
  data.performances = (Leaders.findOne({_id: target._id}) || {}).performances;

  if (handle.ready()) {
    data.ready = true;
    data.loading = false;
  } else {
    data.ready = data.leaders.length > 0;
    data.loading = true;
  }

  onData(null, {data});
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(PerformanceComponent);
