import {Submissions, Students} from 'libs/collections'

Submissions._ensureIndex({
  "users": 1,
  "target_name": 1,
  "submission_time": 1,
  "performance": 1,
  "score": 1,
  "users": 1
});

Students._ensureIndex({ "email": 1 });
