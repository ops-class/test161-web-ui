import {IntroComponent} from '../components/intro';
import {composeWithTracker} from 'mantra-core';

import intro from 'html!client/html/intro.txt';

export const composer = ({}, onData) => {
  onData(null, {__html: intro});
};

export default composeWithTracker(composer)(IntroComponent);
