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
    let sale_to_add = {
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
    }

    let responses = http.batch([
        [
            'POST',
            `${BASE_URL}/add-sale`,
            sale_to_add,
            {tags: {name: 'Add-sale responses'}},
        ],
        [
            'POST',
            `${BASE_URL}/add-sale`,
            sale_to_add,
            {tags: {name: 'Add-sale responses'}},
        ],
        [
            'POST',
            `${BASE_URL}/add-sale`,
            sale_to_add,
            {tags: {name: 'Add-sale responses'}},
        ],
        [
            'POST',
            `${BASE_URL}/add-sale`,
            sale_to_add,
            {tags: {name: 'Add-sale responses'}},
        ],
    ]);
    check(responses, {
        'add a sale 1': (resp) => resp[0].json('result') === "it's done",
        'add a sale 2': (resp) => resp[1].json('result') === "it's done",
        'add a sale 3': (resp) => resp[2].json('result') === "it's done",
        'add a sale 4': (resp) => resp[3].json('result') === "it's done",
    });
    sleep(1);
}
 
