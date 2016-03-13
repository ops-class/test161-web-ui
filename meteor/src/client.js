import { FlowRouter } from 'meteor/meteorhacks:flow-router';

import 'client/';

Meteor.startup(function() {
  FlowRouter.initialize();
});
