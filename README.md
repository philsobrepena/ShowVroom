# CarCar
Working Name CarCar is an application for managing the logistics of a car dealership. Inventory, sales, and services are managed with this applicatin. 
Team: 18

Hung Hoang - Automobile Service
Phil Sobrepena - Automobile Sales

## Design
CarCar is comprised of three different microservices that work together.
-Services
-Sales
-Inventory
## Service microservice

Explain your models and integration with the inventory
microservice, here.

Approach: I will create the django models in service_rest, create the necessary Value Objects (VO)
Services interacts with the inventory microservice and database to populate the web page with relevant data. This includes appointments, technicians, and  Automobile/VIN data. 
Within this microservice you can create,read/get, update, and delete technicians and appointments. 

## Sales microservice

Explain your models and integration with the inventory
microservice, here.

## Integration
Our 3 microservices work together to make our application work.
The inventory domain keeps a record in the database of all automobiles(along with their relevant information) that are for sale. Sales and services use this data from inventory using a poller, which communicates with inventory in order to ensure all information is updated regularly.

## How to Run this App
**Required installed programs: Docker, Git, and Node.js 18.2 or above**
1. Fork this repository 
2. Clone the forked repository onto your development space/computer.
    - git clone <<forked repository here>>
3. Build and run the project using Docker with these commands:
```
docker volume create beta-data
docker-compose build
docker-compose up
```
- After running these commands, make sure all of your Docker containers are running

- View the project in the browser: http://localhost:3000/


INSERT IMAGE HERE



## Diagram
 - Put diagram here
 INSERT DIAGRAM HERE

## API Documentation

### URLs and Ports
 - Put URLs and ports for services here

### Inventory API (Optional)
 - Put Inventory API documentation here. This is optional if you have time, otherwise prioritize the other services.

### Service API
 - Thanks for checking out the application!
 The Service microservice deals with all the logistics of bringing in your car to the dealership for repairs or maintenance.
Vehicles sold by this dealership will be tracked as VIP and will get special amenities! Amenities include a prioritized allocation of new brand new models with minimal Adjusted Dealer Markups.

The Service API lies in the url pattern http://localhost:8080/api/ and manages technicians and services. 

### Technicians
Use this format to interact with Technicians:
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List technicians | GET | http://localhost:8080/api/technicians/
| Technician detail | GET | http://localhost:8080/api/technicians/<int:pk>/
| Create a technician | POST | http://localhost:8080/api/technicians/
| Delete a technician | DELETE | http://localhost:8080/api/technicians/<int:pk>/

LIST TECHNICIANS: Sending a GET request to this endpoint will return a list of all existing technicians. Example below:

```
http://localhost:8080/api/technicians/
Example:
{
	"technicians": [
		{
			"first_name": "John",
			"last_name": "Doe",
			"employee_id": "1",
			"id": 1
		},
    ]
}    
```

TECHNICIAN DETAIL: Sending a GET request to this endpoint will return a detailed view of all a technician by id. Example below:

```
http://localhost:8080/api/technicians/4/
Example:
{
	"first_name": "John",
	"last_name": "Doe",
	"employee_id": "1",
	"id": 1
}
```
CREATE A TECHNICIAN: Sending a POST request to this endpoint will create a technician with the necessary information. "id" is automatically generated in the database. Verify this is working by sending a GET request to LIST TECHNICIANS. Example below:

```
http://localhost:8080/api/technicians/1/
Example input:
{
	"first_name": "New",
	"last_name": "Technician",
	"employee_id": "2"
}
Example Output:
{
	"first_name": "New",
	"last_name": "Technician",
	"employee_id": "2",
	"id": 2
}

```
DELETE A TECHNICAN: Sending a DELETE request to this endpoint will delete an existing technician. Use id=<int:pk> to specify which technician. 
http://localhost:8080/api/technicians/<int:pk>/

Make sure your data inputs match the above examples or else you will get errors. 


### Service Appointments
Note: date_time fields MUST be in this format: "2023-04-20T14:39:00+00:00". 
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List service appointments | GET | http://localhost:8080/api/serviceappointments/
| Service appointment detail | GET | http://localhost:8080/api/serviceappointments/<int:id>/
| Create service appointment | POST | http://localhost:8080/api/serviceappointments/
| Delete service appointment | DELETE | http://localhost:8080/api/serviceappointments/<int:id>/

LIST SERVICE APPOINTMENTS: Sending a GET request to this endpoint will return a list of all existing service appointments. Example below:
```
http://localhost:8080/api/serviceappointment/
{
	"appointments": [
		{
			"date_time": "2023-04-20T14:39:00+00:00",
			"reason": "broken glass. everywhere.",
			"status": "finished",
			"vin": "2222",
			"customer": "Warren Longmire",
			"technician": {
				"first_name": "John",
				"last_name": "Doe",
				"employee_id": "69",
				"id": 7
			},
			"vip": false,
			"id": 1
		},
    ]
}
```
SERVICE APPOINTMENT DETAIL: Sending a GET request to this endpoint will return information of a specific service appointment. Example below:
```
http://localhost:8080/api/serviceappointments/<int:id>/
http://localhost:8080/api/serviceappointment/6/
{
	"date_time": "2023-04-20T14:39:00+00:00",
	"reason": "smells like w33d bruh ",
	"status": "canceled",
	"vin": "420",
	"customer": "CUSTOMER NAME HERE",
	"technician": {
		"first_name": "John",
		"last_name": "Doe",
		"employee_id": "69",
		"id": 7
	},
	"vip": false,
	"id": 6
}
```
SERVICE APPOINTMENT HISTORY can be viewed on the React portion of the front end application: http://localhost:3000/appointments/history
Here you will be able to see a list of ALL service appointments with ALL statuses. You are also able to filter/search service appointments by VIN.
![Img](/ghi/app/public/service_history_all.PNG)
![Img](/ghi/app/public/service_history_filtered.PNG)

CREATE SERVICE APPOINTMENT: Sending a POST request to this endpoint will create a new service appointment. Example below:
Note: technician is specified by "employee_id", NOT the auto generated "id". See example below

```
Input:
{
	"date_time": "2022-07-25T14:39:00.000Z",
	"reason": "making new appointment",
	"vin": "1234",
	"customer": "Random customer name",
	"technician": "2"
}

Output:
{
	"date_time": "2022-07-25T14:39:00.000Z",
	"reason": "making new appointment",
	"status": "IN_PROGRESS_STATUS",
	"vin": "1234",
	"customer": "Random customer name",
	"technician": {
		"first_name": "John",
		"last_name": "Doe",
		"employee_id": "2",
		"id": 4
	},
	"vip": false,
	"id": 39
}
```

DELETE SERVICE APPOINTMENT: Sending a DELETE request to http://localhost:8080/api/serviceappointments/<int:id>/ will delete the specified service appointment. For example, if we wanted to delete the previously created service appointment above we would use 39-<int:id> at the end of the url to do so. 

Thanks for reading!

### Sales API
 - Put Sales API documentation here

## Value Objects
 - Identification of value objects for each service goes here
