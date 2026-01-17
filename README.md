# LibrarayManagement
This is backend of the library management for the management of users and books 

# routes and endpoints 

## /users
GET: get all the users
POST: Register new user

## /users/{id}
GET: get a user by id
POST: register a new user by id 
DELETE: delete a user by id (check if the user has an issued book)&&(if there is any penalty exists)

## /users/subscription details/{id}
GET: get a user subscription by id 
     ->Date of completion
     ->validity
     ->Penalty

## /books
GET:get all the books in the system 
POST:Add a new book in the system

## /books/{id}
GET: get all the books by id
POST: add a new book by id 
DELETE: delete an existing book by id 

## /books/issued
GET: all the books 

## /books/issued/withFine
GET: get all issued books with their fine

### subscription Type
   -> Basic (3 months)
   -> Standard (6 months)
   -> Premium  (12 months)

--> if the user missed its renewal date, then user must be collected with $100
--> if the user missed its subscription, then user must be collected with $100
--> if the user missed its renewal date and subscription , then user must be collected with $200

### commands:

npm init 
npm i express
npm run dev -> Run your project
To restore node modules and node -> npm i / npm install
