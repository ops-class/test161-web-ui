import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactLayout} from 'meteor/kadira:react-layout';
import MainLayout from './components/main_layout';

FlowRouter.route('/', {
  name: 'home',
  action(params, queryParams) {
    ReactLayout.render(MainLayout, {params});
  }
});

FlowRouter.route('/:path', {
  name: 'main',
  action(params, queryParams) {
    ReactLayout.render(MainLayout, {params});
  }
});
