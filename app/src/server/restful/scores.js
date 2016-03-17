import {API} from './api';
import {queryScores} from './query';
import {checkScoreRequest, checkStaffByToken} from './utils';

API.addCollection({}, 'scores', {
  authenticate: (token) => {
    return checkStaffByToken(token);
  },
  methods: [ 'POST' ],
  before: {
    POST: (data, requestMetadata, returnObject) => {
      const success = true;
      let statusCode = 200;
      let body = {};

      if (!checkScoreRequest(data)) {
        statusCode = 400;
        body = {error: 'Bad Request'};
      } else {
        const {target, deadline, users} = data;
        let time = deadline ? new Date(deadline) : new Date();
        body = queryScores({target, users, deadline: time});
      }

      Object.assign(returnObject, {success, statusCode, body});
      return success;
    }
  },
});
