import {Client} from './utils';
const client = new Client();

const get = (baseUrl, target, token) => {
  if (!target) {
    console.error(`Invalid target name: ${target}`);
    return;
  }

  let url = baseUrl + '/hiddens/' + target;

  client.get(url,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": token
      }
    }, (data, response) => {
      const {statusCode, statusMessage} = response;
      console.log('get');
      console.log({statusCode, statusMessage});
      console.log('----------------------------------------------------------------');
      console.log(data);
      console.log('----------------------------------------------------------------');
    }
  )
}

const post = (baseUrl, data, token) => {
  let url = baseUrl + '/hiddens';

  client.post(url,
    {
      data,
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": token
      }
    }, (data, response) => {
      const {statusCode, statusMessage} = response;
      console.log('post');
      console.log({statusCode, statusMessage});
      console.log('----------------------------------------------------------------');
      console.log(data);
      console.log('----------------------------------------------------------------');
    }
  )
}

export {post, get};
