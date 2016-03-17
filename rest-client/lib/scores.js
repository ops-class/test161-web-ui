import {Client} from './utils';
const client = new Client();

const post = (baseUrl, data, token) => {
  const url = `${baseUrl}/scores/`;

  client.post(url,
    {
      data,
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": token
      }
    }, (data, response) => {
      const {statusCode, statusMessage} = response;
      console.log({statusCode, statusMessage});
      console.log('----------------------------------------------------------------');
      console.log(data);
    }
  )
}

export {post};
