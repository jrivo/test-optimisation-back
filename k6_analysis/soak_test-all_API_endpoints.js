import http from 'k6/http';
import {sleep, check} from 'k6';

export let options = {
    stages: [
        {duration: '10s', target: 30}, // ramp up to 30 users
        {duration: '8m', target: 30}, // stay at 30 users for 8m
        {duration: '10s', target: 0}, // scale down.
    ],
    thresholds: {
        'retrieve a small sample of the database': ['p(95)<100'],
        'delete a sale': ['p(95)<100'],
        'retrieve all the database': ['p(95)<1000'],
        'log in successfully': ['p(95)<1000'],
        'do a heavy operation': ['p(95)<3500'],
        'add a sale': ['p(95)<5000'],
    },
};

const BASE_URL = 'http://0.0.0.0:8082';
const user_credentials = JSON.parse(open('./user_credentials.json'));

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
            'GET',
            `${BASE_URL}/sales`,
            null,
            {tags: {name: 'Sales responses'}},
        ],
        [
            'GET',
            `${BASE_URL}/sales-light`,
            null,
            {tags: {name: 'Sales-light responses'}},
        ],
        [
            'GET',
            `${BASE_URL}/heavy-operation`,
            null,
            {tags: {name: 'Heavy-operation responses'}},
        ],
        [
            'POST',
            `${BASE_URL}/delete-sale`,
            {
                id: Math.floor(Math.random() * 21274)
            },
            {
                tags: {name: 'Delete a sale responses'},
            },
        ],
        [
            'POST',
            `${BASE_URL}/add-sale`,
            {
                region: "Europe",
                country: "France",
                item_type: "Clothes",
                sales_channel: "Offline",
                order_priority: "M",
                order_id: 999562594,
                ship_date: "7/28/2020",
                units_sold: "1593",
                unit_price: 5.5,
                unit_cost: 4,
                total_revenue: 2001.78,
                total_cost: 11023.56,
                total_profit: 3856.48,
                order_date: "7/27/2012",
            },
            {tags: {name: 'Add-sale responses'}},
        ],
    ]);

    check(responses, {
        'log in successfully': (resp) => resp[0].json('user') !== null,
        'retrieve all the database': (resp) => resp[1].json().length > 0,
        'retrieve a small sample of the database': (resp) => resp[2].json().length > 0,
        'do a heavy operation': (resp) => resp[3].json('result') === "Operation finished",
        'delete a sale': (resp) => resp[4].json('result') === "Sale deleted",
        'add a sale': (resp) => resp[5].json('result') === "it's done",
    });
    sleep(1);
}
 
