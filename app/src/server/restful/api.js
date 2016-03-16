import {CollectionAPI} from 'meteor/xcv58:collection-api';

const API = new CollectionAPI({
  apiPath: 'api-v1',
  timeOut: 120000
});

export {API};
