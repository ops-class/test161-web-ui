import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';

import 'client/';

Meteor.startup(function () {
  FlowRouter.initialize();
});
