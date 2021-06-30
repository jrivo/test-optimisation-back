## Steps to run the project

### Step 1

Download the sales csv file and add it to the root folder 

CSV file link: https://drive.google.com/file/d/1u9KmsyFH-lRwmcxRvFxQtp5N5RWJO3VZ/view?usp=sharing

### Step 2

The next step is to import the file to your database

```
// Run docker-compose
sudo docker-compose up -d


// Add the file in the postgres container
sudo docker cp sales.csv 4ad2adecd9f4:/
// 4ad2adecd9f4 is just an example you should use your own postrgres container ID


// To import the file to your database
sudo docker-compose exec php bin/console doctrine:query:sql "COPY sale(region, country, item_type, sales_channel, order_priority, order_date, order_id, ship_date, units_sold, unit_price, unit_cost, total_revenue, total_cost, total_profit, id) FROM '/sales.csv' DELIMITER ',' CSV HEADER;"
```

And that's it you're good to go

### API endpoints

###### sales
To get all the sales ( a very large volume of data) you can visit: 
http://0.0.0.0:8082/sales
Request type: GET

###### sales light
To get only a sample of the data you can go to:
http://0.0.0.0:8082/sales-light
This request is much faster than the previous one since it only gets 10 sales
Request type: GET

###### heavy operation
The enpoint below triggers an aoperation that conssumes a lot of resources, it usually takes a few seconds
http://0.0.0.0:8082/heavy-operation
Request type: GET

###### delete sale
This endpoint allows the client to delete an entry
http://0.0.0.0:8082/delete-sale
Request type: POST
```
//request example
{"id": 2}
//deletes sale with id=2 
```

##### add sale
Enpoint to add a new sale 
http://0.0.0.0:8082/add-sale
The response isn't sent right away, the program waits a few seconds (generated randomly) before sending a response
Request type: POST

```
//request example
{
	"region": "Europe",
	"country": "France",
	"item_type": "Clothes",
	"sales_channel": "Offline",
	"order_priority": "M",
	"order_id": 999562594,
	"ship_date": "7/28/2020",
	"units_sold": "1593",
	"unit_price": 5.5,
	"unit_cost": 4,
	"total_revenue": 2001.78,
	"total_cost": 11023.56,
	"total_profit": 3856.48,
	"order_date": "7/27/2012",
	
}
```


###### login
To login you need to send a POST request to this url
http://0.0.0.0:8082/login
Request type: POST
```
//request example
{
	"username": "your_username",
	"password": "some-password",
	
}
```
but before sending the request you might wanna add a new user in the database

To add a user you can use phpstorm go the the user table and add a user manually
you will need a hashed password though
to generate a hashed password run the following command in the terminal: 
```
sudo docker-compose exec php bin/console security:hash-password
```

then copy the hashed password and past it in the passsword field in the user table (in phpstorm)  



