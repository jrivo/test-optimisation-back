import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '20s', target: 10 }, // below normal load
    { duration: '1m', target: 10 },
    { duration: '20s', target: 20 }, // normal load
    { duration: '1m', target: 20 },
    { duration: '20s', target: 30 }, // around the breaking point
    { duration: '1m', target: 30 },
    { duration: '20s', target: 40 }, // beyond the breaking point
    { duration: '1m', target: 40 },
    { duration: '2m', target: 0 }, // scale down. Recovery stage.
  ],
};

const BASE_URL = 'http://0.0.0.0:8082';
const user_credentials = JSON.parse(open('./user_credentials.json'))

export default function () {

  let responses = http.batch([
    [
      'GET',
      `${BASE_URL}/sales`,
      null,
      { tags: { name: 'Sales responses' } },
    ],
    [
      'GET',
      `${BASE_URL}/sales`,
      null,
      { tags: { name: 'Sales responses' } },
    ],
    [
      'GET',
      `${BASE_URL}/sales`,
      null,
      { tags: { name: 'Sales responses' } },
    ],
    [
      'GET',
      `${BASE_URL}/sales`,
      null,
      { tags: { name: 'Sales responses' } },
    ],
  ]);

  sleep(1);
}
 
