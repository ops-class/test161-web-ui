import {NavigationComponent} from '../components/navigation';
import {composeWithTracker} from 'mantra-core';

import navigation from 'html!client/html/navigation.txt';

export const composer = ({}, onData) => {
  onData(null, {__html: navigation});
};

export default composeWithTracker(composer)(NavigationComponent);
