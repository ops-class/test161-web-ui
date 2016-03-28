import {mount} from 'react-mounter';

import MainLayout from './containers/main_layout';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/', {
    name: 'submissions.list',
    action(params, queryParams) {
      mount(MainLayoutCtx, {params, queryParams});
    }
  });

  FlowRouter.route('/:path', {
    name: 'main',
    action(params, queryParams) {
      mount(MainLayoutCtx, {params, queryParams});
    }
  });
}
