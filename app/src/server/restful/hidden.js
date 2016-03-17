import {API} from './api';
import {queryHiddens, processActions} from './query';
import {checkHiddenRequest, checkStaffByToken} from './utils';

API.addCollection({find: () => []}, 'hiddens', {
  authenticate: (token) => {
    return checkStaffByToken(token);
  },
  methods: [ 'GET', 'POST' ],
  before: {
    GET: (objs, requestMetadata, returnObject) => {
      const success = true;
      let statusCode = 200;
      let body = {};

      const {collectionId: target} = requestMetadata;
      if (!target) {
        statusCode = 403;
        body = {error: 'You are not allowed to query all targets'};
      } else {
        body = queryHiddens(target);
      }

      Object.assign(returnObject, {success, statusCode, body});
      return success;
    },
    POST: (data, requestMetadata, returnObject) => {
      const success = true;
      let statusCode = 201;
      let body = {};

      if (!checkHiddenRequest(data)) {
        statusCode = 400;
        body = {error: 'Bad Request'};
      } else {
        const {target, action, users} = data;
        body = processActions(target, action, users);
      }

      Object.assign(returnObject, {success, statusCode, body});
      return success;
    }
  },
});
