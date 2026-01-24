const express = require('express');
require('dotenv').config();
const app = express();
const dbConnection = require('./databaseConnection');


//importing routes
const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');

//single line import of models
const {UserModel, BookModel} = require('./models');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect to database
dbConnection(); 
app.use('/users', usersRouter);
app.use('/books', booksRouter);

//default route
app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Hello World!'
    });
});

const PORT = 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

