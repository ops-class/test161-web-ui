import {TimeComponent} from '../components/submissionlist/submission/time';
import {useDeps} from 'mantra-core';

export const depsMapper = (context, actions) => ({
  context: () => context,
  toggleSubmission: actions.submission.toggleSubmission
});

export default useDeps(depsMapper)(TimeComponent);
