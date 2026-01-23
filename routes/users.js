const express = require('express');
const router= express.Router();
const {users}= require('../data/users.json');
const { DATETIME } = require( 'mysql/lib/protocol/constants/types' );

//get all users
router.get('/', function(req, res) {
    return res.status(200).json({  
        message: 'Users retrieved successfully',
        data: users
    });
})

//get user by id
router.get('/users/:id', function(req, res) {
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
router.post('/', function(req, res) {
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
router.put('/:id', function(req, res) {
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


//delete user by id
router.delete('/:id', function(req, res) {
    const userId = req.params.id;   
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({
            message: `User with id ${userId} not found`
        });
    }
 
    users.splice(userIndex, 1);
    return res.status(200).json({
        message: `User with id ${userId} deleted successfully`
    });
  });


//subscription details of User by id
router.get('/:id/subscription', (req, res) => {
    const userId = req.params.id;

    const user = users.find(u => u.id == userId);

    if (!user) {
        return res.status(404).json({
            message: `User with id ${userId} not found`
        });
    }

    // convert date → days
    const getDateInDays = (data = '') => {
        let date = data ? new Date(data) : new Date();
        return Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
    };

    // calculate subscription expiry
    const subscriptionType = (subscriptionDate) => {
        let date = subscriptionDate;

        if (user.subscriptionType === 'Basic') {
            date += 90;
        } else if (user.subscriptionType === 'Standard') {
            date += 180;
        } else if (user.subscriptionType === 'Premium') {
            date += 365;
        }

        return date;
    };

    const returnDate = getDateInDays(user.returnDate);
    const currentDate = getDateInDays();
    const subscriptionDate = getDateInDays(user.subscriptionDate);

    const subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user,
        subscriptionExpired: subscriptionExpiration < currentDate,
        subscriptionDaysLeft: subscriptionExpiration - currentDate,
        daysLeftForReturn: returnDate - currentDate,
        fine:
            returnDate < currentDate
                ? subscriptionExpiration <= currentDate
                    ? 200
                    : 100
                : 0
    };

    return res.status(200).json({
        message: 'Subscription details retrieved successfully',
        data
    });
});

module.exports = router;