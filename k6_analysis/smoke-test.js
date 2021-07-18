import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

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

export default () => {
    let loginRes = http.post(`${BASE_URL}/login`, JSON.stringify(user_credentials), {
        headers: {'Content-Type': 'application/json'}
    });
    check(loginRes, {
        'log in successfully': (resp) => resp.json('user') !== null,
    });

    let allTheData = http.get(`${BASE_URL}/sales`).json();
    check(allTheData, {'retrieve all the database': (obj) => obj.length > 0});

    let sampleOfData = http.get(`${BASE_URL}/sales-light`).json();
    check(sampleOfData, {'retrieve a small sample of the database': (obj) => obj.length > 0});

    let heavyOperationRes = http.get(`${BASE_URL}/heavy-operation`);
    check(heavyOperationRes, {'do a heavy operation': (obj) => obj.json('result') === "Operation finished"});

    let deleteSaleRes = http.post(`${BASE_URL}/delete-sale`, {
        id: Math.floor(Math.random() * 21274)
    });
    check(deleteSaleRes, {'delete a sale': (obj) => obj.json('result') === "Sale deleted"});

    let addSaleRes = http.post(`${BASE_URL}/add-sale`, {
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
    });
    check(addSaleRes, {'add a sale': (obj) => obj.json('result') === "it's done"});

    sleep(1);
}
