import http from 'k6/http';
import {sleep, check} from 'k6';

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

export default function () {

    let responses = http.batch([
        [
            'GET',
            `${BASE_URL}/heavy-operation`,
            null,
            {tags: {name: 'Heavy-operation responses'}},
        ],
        [
            'GET',
            `${BASE_URL}/heavy-operation`,
            null,
            {tags: {name: 'Heavy-operation responses'}},
        ],
        [
            'GET',
            `${BASE_URL}/heavy-operation`,
            null,
            {tags: {name: 'Heavy-operation responses'}},
        ],
        [
            'GET',
            `${BASE_URL}/heavy-operation`,
            null,
            {tags: {name: 'Heavy-operation responses'}},
        ],
    ]);

    check(responses, {
        'do a heavy operation 1': (resp) => resp[0].json('result') === "Operation finished",
        'do a heavy operation 2': (resp) => resp[1].json('result') === "Operation finished",
        'do a heavy operation 3': (resp) => resp[2].json('result') === "Operation finished",
        'do a heavy operation 4': (resp) => resp[3].json('result') === "Operation finished",
    });
    sleep(1);
}
 
