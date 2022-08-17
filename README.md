#Rest-API Tutorial
This project is Rest-API Tutorial.
I gonna use Node.js and PostgreSQL in this project.



#Routes
GET http://localhost:3000/api/users

###

GET http://localhost:3000/api/products HTTP/1.1
#Authorization: Bearer JsonWebToken

###

GET http://localhost:3000/api/users/register

###

POST http://localhost:3000/api/users/register HTTP/1.1
content-type: application/json

{
  "email": "",
  "password": "",
  "fullname": ""
}

###

GET http://localhost:3000/api/users/login

###

POST http://localhost:3000/api/users/login HTTP/1.1
content-type: application/json

{
  "email": "",
  "password": ""
}

###

POST http://localhost:3000/api/users/36 HTTP/1.1
content-type: application/json

{
  "email": "",
  "fullname": ""
}

###

DELETE http://localhost:3000/api/users/3 HTTP/1.1
