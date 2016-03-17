import {Client} from 'node-rest-client';

const TOKEN = '3CCDbiRaopQKDmKqs';
const ENDPOINT = 'http://127.0.0.1:3000/api-v2/scores/';

const client = new Client();
const data = {
  target: "asst1",
  deadline: new Date(),
  users: [
    {
      deadline: '2016-03-16T03:39:26.894Z',
      email: 'admin@ops-class.org',
    },
    {
      email: 'Qon4n@buffalo.edu'
    }
  ]
}


const post = () => {
  client.post(ENDPOINT,
    {
      data,
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": TOKEN
      }
    }, (data, response) => {
      const {statusCode, statusMessage} = response;
      console.log({statusCode, statusMessage});
      console.log('----------------------------------------------------------------');
      console.log(data);
    }
  )
}

setTimeout(post, 1);
