import {AssignmentComponent} from '../components/leaders/assignment';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, target}, onData) => {
  const {
    Collections: {Leaders}, Libs: {LeaderboardSubs, getAsstLeaderTitle}
  } = context();

  const ready = false;
  const loading = true;
  let data = {ready, loading};

  const handle = LeaderboardSubs.subscribe('leaderboards', target);
  data.leaders = Leaders.find(
    { target: target._id },
    { sort: { score: -1, submission_time: -1 } }
  ).fetch();
  data.scores = (Leaders.findOne({_id: target._id}) || {}).scores;

  if (handle.ready()) {
    data.ready = true;
    data.loading = false;
  } else {
    data.ready = data.leaders.length > 0;
    data.loading = true;
  }

  onData(null, {data, getAsstLeaderTitle});
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(AssignmentComponent);
