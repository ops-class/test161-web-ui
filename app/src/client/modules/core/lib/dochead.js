import {DocHead} from 'meteor/kadira:dochead';

const loadSiteJS = () => {
  DocHead.loadScript('/js/site.js', () => {});
};

export {loadSiteJS};
