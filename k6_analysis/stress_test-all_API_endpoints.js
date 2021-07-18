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
 
