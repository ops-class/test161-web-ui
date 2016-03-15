import {mount} from 'react-mounter';

import MainLayout from './containers/main_layout';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/', {
    name: 'submissions.list',
    action(params) {
      mount(MainLayoutCtx, {params});
    }
  });

  FlowRouter.route('/:path', {
    name: 'main',
    action(params) {
      mount(MainLayoutCtx, {params});
    }
  });
}
