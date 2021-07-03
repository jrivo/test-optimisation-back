import http from 'k6/http';
import { check, group, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 10 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: '2m', target: 10 }, // stay at 100 users for 10 minutes
    { duration: '1m', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'http://0.0.0.0:8082';
const user_credentials = JSON.parse(open('./user_credentials.json'))

export default () => {
  let loginRes = http.post(`${BASE_URL}/login`, {
    username: user_credentials.USERNAME,
    password: user_credentials.PASSWORD,
  });
  check(loginRes, {
    'logged in successfully': (resp) => resp.json('user') !== null,
  });

  let allTheData = http.get(`${BASE_URL}/sales`).json();
  check(allTheData, { 'retrieve all the database': (obj) => obj.length > 0 });

  let sampleOfData = http.get(`${BASE_URL}/sales-light`).json();
  check(sampleOfData, { 'retrieve a small sample of the database': (obj) => obj.length > 0 });

  let heavyOperationRes = http.get(`${BASE_URL}/heavy-operation`);
  check(heavyOperationRes, { 'do a heavy operation': (obj) => obj.json('result') === "Operation finished" });

	// Commented 'delete-sales' because will delete database elements during tests
	// let deleteSaleRes = http.post(`${BASE_URL}/delete-sale`, {
	// 	id: Math.floor(Math.random() * 21274)
	// });
  // check(deleteSaleRes, { 'delete a sale': (obj) => obj.json('result') === "Sale deleted" });

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
  check(addSaleRes, { 'add a sale': (obj) => obj.json('result') === "it's done" });

  sleep(1);
};

