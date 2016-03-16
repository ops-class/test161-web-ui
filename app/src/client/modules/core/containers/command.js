import {CommandComponent} from '../components/commandlist/command';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, status}, onData) => {
  const {Libs: {isCommandRunning, getCommandStatusClass}} = context();
  const statusClass = getCommandStatusClass(status);
  onData(null, {statusClass, isCommandRunning});
};

export const depsMapper = (context) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(CommandComponent);
