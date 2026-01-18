const express = require('express');
const app = express();
const {users}= require('./data/users.json');

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Hello World!'
    });
});

//get all users
app.get('/users', function(req, res) {
    return res.status(200).json({  
        message: 'Users retrieved successfully',
        data: users
    });
})

//get user by id
app.get('/users/:id', function(req, res) {
    const userId = req.params.id;

    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({
            message: `User with id ${userId} not found`
        });
    }

    return res.status(200).json({
        message: `User with id ${userId} retrieved successfully`,
        data: user
    });
});

//create a new user
app.post('/users', function(req, res) {
    const newUser = req.body;   
    const UserExists = users.find(u => u.id === newUser.id);

    //validate request body
    const{ id, name, subscriptionDate } = req.body;
    if(!newUser.id || !newUser.name || !newUser.subscriptionDate) {
        return res.status(400).json({
            message: 'Please provide id, name and subscriptionDate for the user'
        });
    }
    //check if user with same id already exists
    if(UserExists){
        return res.status(400).json({
            message: `User with id ${newUser.id} already exists`
        });
    }
else{
    users.push(newUser);
    return res.status(201).json({
        message: 'User created successfully',
        data: newUser
    });
}
});

//update user by id
app.put('/users/:id', function(req, res) {
    const userId = req.params.id;
    const updatedUser = req.body;

    //check if user exists
    const userIndex = users.findIndex(u => u.id === userId);    
    if (userIndex === -1) {
        return res.status(404).json({
            message: `User with id ${userId} not found`
        });
    }
    //update user
    else
        {
            Object.assign(users[userIndex], updatedUser);
            return res.status(200).json({
                message: `User with id ${userId} updated successfully`,
                data: users[userIndex]
            });
        }
});

// ❗ always LAST
app.use((req, res) => {
   return res.status(404).json({
        message: 'Route not found'
    })
});


const PORT = 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
