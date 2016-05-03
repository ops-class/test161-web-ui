import {TestListComponent} from '../components/testlist';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, tests}, onData) => {
  const {
    Collections: {Tests},
    Libs: {TestSubs, compareTest}
  } = context();

  const ready = false;
  let data = {ready};

  const handle = TestSubs.subscribe('tests', tests);

  data.testList = tests.map(_id => Tests.findOne({_id}))
  .filter(ele => Boolean(ele))
  .sort(compareTest);

  if (handle.ready()) {
    data.ready = true;
    data.loading = false;
  } else {
    data.ready = data.testList.length > 0;
    data.loading = true;
  }

  onData(null, {data});
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(TestListComponent);
