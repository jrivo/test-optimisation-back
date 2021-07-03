import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 30 }, // ramp up to 30 users
    { duration: '10m', target: 30 }, // stay at 30 users for 10m
    { duration: '10s', target: 0 }, // scale down.
  ],
};

const BASE_URL = 'http://0.0.0.0:8082';
const user_credentials = JSON.parse(open('./user_credentials.json'))

export default function () {

  let responses = http.batch([
    [
      'POST',
      `${BASE_URL}/login`,
      user_credentials,
      { tags: { name: 'Login responses' } },
    ],
    [
      'GET',
      `${BASE_URL}/sales`,
      null,
      { tags: { name: 'Sales responses' } },
    ],
    [
      'GET',
      `${BASE_URL}/sales-light`,
      null,
     { tags: { name: 'Sales-light responses' } },
    ],
    [
      'GET',
      `${BASE_URL}/heavy-operation`,
      null,
      { tags: { name: 'Heavy-operation responses' } },
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
      { tags: { name: 'Add-sale responses' } },
    ],
  ]);

  sleep(1);
}
 
