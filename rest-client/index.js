import {Scores, Hiddens} from './lib';

const TOKEN = '3CCDbiRaopQKDmKqs';
const BASE_URL = 'http://127.0.0.1:3000/api-v2';

// Scores.post(
//   BASE_URL, {
//     target: "asst1",
//     deadline: new Date(),
//     users: [
//       {deadline: '2016-03-16T03:39:26.894Z', email: 'admin@ops-class.org'},
//       {email: 'Qon4n@buffalo.edu'}
//     ]
//   },
//   TOKEN
// );

Hiddens.get(BASE_URL, 'asst1', TOKEN);

Hiddens.post(
  BASE_URL,
  {
    target: 'asst1',
    users: [
      {email: 'admin@ops-class.org'}
    ]
  },
  TOKEN
);
