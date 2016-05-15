import {Scores, Hiddens} from './lib';

const TOKEN = 'xxxxxxxxxxxxxxxxx';
const BASE_URL = 'http://127.0.0.1:3000/api-v2';

Scores.post(
  BASE_URL, {
    target: 'asst3',
    version: 1,
    deadline: new Date(),
    users: [
      {email: 'admin@buffalo.edu'}
    ]
  },
  TOKEN
);

// Hiddens.get(BASE_URL, 'asst1', TOKEN);
//
// Hiddens.post(
//   BASE_URL,
//   {
//     target: 'asst1',
//     users: [
//       {email: 'admin@ops-class.org'}
//     ]
//   },
//   TOKEN
// );
