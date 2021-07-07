import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '1m',

  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'http://0.0.0.0:8082';
const user_credentials = JSON.parse(open('./user_credentials.json'));

export default () => {
	let loginRes = http.post(`${BASE_URL}/login`, user_credentials, { 
		headers: { 'Content-Type': 'application/json' }
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
 
export function handleSummary(data) {
	console.log('Preparing the end-of-test summary...');

	return {
		'stdout': textSummary(data, { indent: ' ', enableColors: true}), // Show the text summary to stdout...
		'./results/smoke-test.json': JSON.stringify(data), // and a JSON with all the details...
	}

}
