# CarCar

Team:

Hung Hoang - Automobile Service
Phil Sobrepena - Automobile Sales

## Diagram & Design

CarCar is an application that contains 3 microservices that integrate with each other.

Inventory
Services
Sales

Below is a diagram of their relationship to one another.

 *******************
ghi/app/public/CarCar-Diagram.png
 ********************



## Service microservice

Explain your models and integration with the inventory
microservice, here.

Approach: I will create the django models in service_rest, create the necessary Value Objects (VO)

## Sales microservice

The sales microservice models are defined as follows:

AutomobileVO:
    A value object that uses a poller to get data from the Automobile object in Inventory.

SalesPerson:
    contains first_name, last_name, and employee_id traits.

Customer:
    contains first_name, last_name, address, and phone_number traits.
Sale:
    contains automobile, salesperson, customer, and price traits.

The Sales Microservice requires integration with the Inventory in order to properly receive automobile information when making a sale. When a sale is made, the automobile instance is updated with a put request to change the value sold=True.


## How to Run this App
To run this application, fork and clone the repository at:

https://gitlab.com/hungdh17/project-beta

Then execute the following commands to build and run the project:

 - docker volume create beta-data
 - docker compose build
 - docker compose up

 Once containers are running hte project can be viewed at:

 http://localhost:3000/

## API Documentation

### URLs and Ports

The application uses the following URLs for the front end:

CarCar Home Page:
http://localhost:3000/

---**INVENTORY URLS**---

Manufacturer List:
http://localhost:3000/manufacturers

Create a Manufacturer:
http://localhost:3000/manufacturers/create

Models List:
http://localhost:3000/models

Create a Model:
http://localhost:3000/models/create

Automobiles List:
http://localhost:3000/automobiles

Create an Automobile:
http://localhost:3000/automobiles/create

---**SERVICES URLS**---

Technicians List:
http://localhost:3000/technicians/

Create a Technician:
http://localhost:3000/technicians/create

Appointments List:
http://localhost:3000/appointments

Create an Appointment:
http://localhost:3000/appointments/create

Appointment History:
http://localhost:3000/appointments/history

---**SALES URLS**---

Customers List:
http://localhost:3000/customers

Create a Customer:
http://localhost:3000/customers/create

Salespeople List:
http://localhost:3000/salespeople

Create a Salesperson:
http://localhost:3000/salespeople/create

Sales List:
http://localhost:3000/sales

Sales by Salesperson List:
http://localhost:3000/sales/salesperson

Create a Sale:
http://localhost:3000/sales/create


----**PORTS**----

the following ports are referenced throughout this document, but are referenced again here for convenience.

---MANUFACTURERS---

List manufacturers	            GET	    http://localhost:8100/api/manufacturers/
Create a manufacturer	        POST    http://localhost:8100/api/manufacturers/
Get a specific manufacturer	    GET	    http://localhost:8100/api/manufacturers/:id/
Update a specific manufacturer	PUT	    http://localhost:8100/api/manufacturers/:id/
Delete a specific manufacturer	DELETE	http://localhost:8100/api/manufacturers/:id/

---VEHICLES---

List vehicle models	            GET     http://localhost:8100/api/models/
Create a vehicle model	        POST	http://localhost:8100/api/models/
Get a specific vehicle model	GET	    http://localhost:8100/api/models/:id/
Update a specific vehicle model	PUT	    http://localhost:8100/api/models/:id/
Delete a specific vehicle model	DELETE	http://localhost:8100/api/models/:id/

---AUTOMOBILES---

List automobiles	            GET 	http://localhost:8100/api/automobiles/
Create an automobile	        POST	http://localhost:8100/api/automobiles/
Get a specific automobile	    GET	    http://localhost:8100/api/automobiles/:vin/
Update a specific automobile	PUT	    http://localhost:8100/api/automobiles/:vin/
Delete a specific automobile	DELETE	http://localhost:8100/api/automobiles/:vin/

---TECHNICIANS---

List technicians	                    GET	    http://localhost:8080/api/technicians/
Create a technician	                    POST	http://localhost:8080/api/technicians/
Delete a specific technician	        DELETE	http://localhost:8080/api/technicians/:id
List appointments	                    GET	    http://localhost:8080/api/appointments/
Create an appointment	                POST	http://localhost:8080/api/appointments/
Delete an appointment	                DELETE	http://localhost:8080/api/appointments/:id
Set appointment status to "canceled"	PUT	    http://localhost:8080/api/appointments/:id/cancel
Set appointment status to "finished"	PUT	    http://localhost:8080/api/appointments/:id/finish

---AUTOMOBILES---

List salespeople	            GET	    http://localhost:8090/api/salespeople/
Create a salesperson	        POST	http://localhost:8090/api/salespeople/
Delete a specific salesperson	DELETE	http://localhost:8090/api/salespeople/:id
List customers	                GET	    http://localhost:8090/api/customers/
Create a customer	            POST	http://localhost:8090/api/customers/
Delete a specific customer	    DELETE	http://localhost:8090/api/customers/:id
List sales	                    GET	    http://localhost:8090/api/sales/
Create a sale	                POST	http://localhost:8090/api/sales/
Delete a sale	                DELETE	http://localhost:8090/api/sales/:id


### Inventory API (Optional)

The Inventory API contains 3 Models which are used by both Services and Sales APIs

The models are as follows:

Manufacturer:
    Contains the name trait for the manufacturer.

VehicleModel
    Contains the name, picture_url, and manufacturer foreignkey traits pertaining to a specific Vehicle

Automobiles
    Contains the color, year, vin, sold, and model (foreignkey) traits for a specific automobile

In order for an Automobile to be created, a VehicleModel must be created, and in order for a VehicleModel to be created, a Manufacturer must be created.

If objects are not created in this order, the create forms cannot be properly filled out.

Here is a diagram simplifying that relationship.

| Manufacturer -> VehicleModel -> Automobile |

end of diagram.

The Sales and Service APIS require Automobile data in order to process their requests. Data from Automobiles in the Inventory are sent to each microservice every 60 seconds through a poller.


### Service API
 - Put Service API documentation here

### Sales API
Endpoints for GET | POST | DELETE :

**NOTE** delete requests require "/<id>" added to the end of the request path.

customers:
http://localhost:8090/api/customers/

below is an example for a customer POST request (create a customer) with the proper json format:

{
	"first_name": "Frankie",
	"last_name": "Steinberger",
	"address": "1234 Sesame Street",
	"phone_number": "4154154155"
}

salespeople:
http://localhost:8090/api/salespeople/

below is an example for a saleperson POST request (create a salesperson) with the proper json format:

{
	"first_name": "Frank",
	"last_name": "Stein",
	"employee_id": "2"
}

sales:
http://localhost:8090/api/sales/

below is an example for a sales POST request (create a sale) with the proper json format:

{
	"automobile": "1C3CC5FB2AN120174",
	"salesperson": 1,
	"customer": 3,
	"price": "10000"
}


In order for a sale to be made, there need to be instances of the following models already created in the database:

Automobile
Customer
Salesperson

Without this data the sale form cannot be properly submitted.

the sale model uses foreignkey relationships to the respective models and utilizes a dropdown menu populated off of the existing id numbers created for the instances of salesperson and customer. The VIN number is a unique idenitifier that is used to access a particular vehicle in the inventory.


## Value Objects


**SALES VALUE OBJECT**
The Value Object in the Sales Microservice is the AutomobileVO, which uses a poller to get automobile data from the Inventory.

This integration is key in allowing sales to access existing unsold vehicles in the inventory.
