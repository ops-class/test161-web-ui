import {API} from './api';
import {queryHiddens, processActions} from './query';
import {checkScoreRequest, checkStaffByToken} from './utils';

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

      // TODO: change valid function
      if (!checkScoreRequest(data)) {
        statusCode = 400;
        body = {error: 'Bad Request'};
      } else {
        const {users, target} = data;
        body = processActions(target, users);
      }

      Object.assign(returnObject, {success, statusCode, body});
      return success;
    }
  },
});
