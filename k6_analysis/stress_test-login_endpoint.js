import http from 'k6/http';
import {sleep} from 'k6';

export let options = {
    stages: [
        {duration: '20s', target: 8}, // below normal load
        {duration: '1m', target: 8},
        {duration: '20s', target: 16}, // normal load
        {duration: '1m', target: 16},
        {duration: '20s', target: 24}, // around the breaking point
        {duration: '1m', target: 24},
        {duration: '20s', target: 32}, // beyond the breaking point
        {duration: '1m', target: 32},
        {duration: '2m', target: 0}, // scale down. Recovery stage.
    ],
};

const BASE_URL = 'http://0.0.0.0:8082';
const user_credentials = JSON.parse(open('./user_credentials.json'))

export default function () {

    let responses = http.batch([
        [
            'POST',
            `${BASE_URL}/login`,
            JSON.stringify(user_credentials),
            {
                tags: {name: 'Login responses'},
                headers: {'Content-Type': 'application/json'}
            },
        ],
        [
            'POST',
            `${BASE_URL}/login`,
            JSON.stringify(user_credentials),
            {
                tags: {name: 'Login responses'},
                headers: {'Content-Type': 'application/json'}
            },
        ],
        [
            'POST',
            `${BASE_URL}/login`,
            JSON.stringify(user_credentials),
            {
                tags: {name: 'Login responses'},
                headers: {'Content-Type': 'application/json'}
            },
        ],
        [
            'POST',
            `${BASE_URL}/login`,
            JSON.stringify(user_credentials),
            {
                tags: {name: 'Login responses'},
                headers: {'Content-Type': 'application/json'}
            },
        ],
    ]);

    check(responses, {
        'log in successfully 1': (resp) => resp[0].json('user') !== null,
        'log in successfully 2': (resp) => resp[1].json('user') !== null,
        'log in successfully 3': (resp) => resp[2].json('user') !== null,
        'log in successfully 4': (resp) => resp[3].json('user') !== null,
    });
    sleep(1);
}
 
