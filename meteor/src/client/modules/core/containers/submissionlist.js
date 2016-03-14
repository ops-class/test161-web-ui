import {SubmissionListComponent} from '../components/submissionlist';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = (props, onData) => {
  const {
    context, currentLimit, clearLimit,
    user, params: {path: asst}
  } = props;
  const {
    LocalState, Libs: {SubmissionSubs, findAllSubmissions}
  } = context();
  const limit = LocalState.get('LIMIT') || currentLimit();
  const ready = false;
  const loading = true;
  let data = {ready, asst, user, loading};

  const handle = SubmissionSubs.subscribe('submissions', asst, limit);

  data.submissions = findAllSubmissions(user._id, asst, limit).fetch();

  if (handle.ready()) {
    data.ready = true;
    data.loading = false;
  } else {
    data.ready = data.submissions.length > 0;
    data.loading = true;
  }

  onData(null, {data});

  return clearLimit;
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
)(SubmissionListComponent);
