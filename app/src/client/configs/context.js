import * as Collections from 'lib/collections';
import * as Libs from 'lib/';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Tracker} from 'meteor/tracker';

export default function () {
  return {
    Meteor,
    FlowRouter,
    Collections,
    Libs,
    LocalState: new ReactiveDict(),
    Tracker
  };
}
