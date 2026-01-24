const express = require('express');
const router= express.Router();
// const {users}= require('../data/users.json');
const { DATETIME } = require( 'mysql/lib/protocol/constants/types' );

// const UserModel = require('../models/user-model');
const { getAllUsers,getUserById,addNewUser,updateUserById,deleteUserById,getSubscriptionDetailsById } = require( '../controllers/userC' );

//get all users
router.get('/',getAllUsers);

//get user by id
router.get('/:id',getUserById);

//create a new user
router.post('/',addNewUser);

//update user by id
router.put('/:id',updateUserById);

//delete user by id
router.delete('/:id',deleteUserById);

//subscription details of User by id
router.get('/:id/subscription-details', getSubscriptionDetailsById);

module.exports = router;