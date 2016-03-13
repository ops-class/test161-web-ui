import { FlowRouter } from 'meteor/kadira:flow-router';

import 'client/';

Meteor.startup(function() {
  FlowRouter.initialize();
});
