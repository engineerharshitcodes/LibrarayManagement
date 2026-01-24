const{UserModel,BookModel}=require('../models');

//get all users
exports.getAllUsers=async function(req,res){
    const users=await UserModel.find();

    if(!users||users.length===0){
        return res.status(404).json({
            message:'No users found'
        });
    }
    res.status(200).json({  
        message: 'Users retrieved successfully',
        data: users
    });
}

//get user by id
exports.getUserById=async function(req,res){
    const userId=req.params.id;
    const user=await UserModel.findById(userId);

    if(!user){
        return res.status(404).json({
            message:`User with id ${userId} not found`
        });
    }
    res.status(200).json({  
        message: `User with id ${userId} retrieved successfully`,
        data: user
    });
};

//create a new user
exports.addNewUser=async function(req,res){
    const data=req.body; 
    if(!data||Object.keys(data).length===0){
        return res.status(400).json({
            message:'Invalid user data'
        });
    }

    await UserModel.create(data);

    res.status(201).json({  
        message: 'User created successfully',
        data: data
    });
}

//update user by id
exports.updateUserById=async function(req,res){
    const userId=req.params.id;
    const updatedUser=req.body;
    const user=await UserModel.findById(userId);

    if(!user){
        return res.status(404).json({
            message:`User with id ${userId} not found`
        });
    }
    Object.assign(user,updatedUser);
    const savedUser=await user.save();
    res.status(200).json({
        message: `User with id ${userId} updated successfully`,
        data: savedUser
    });
}

//delete user by id
exports.deleteUserById=async function(req,res){
    const userId=req.params.id;
    const user=await UserModel.findById(userId);

    if(!user){
        return res.status(404).json({
            message:`User with id ${userId} not found`
        });
    }
    await UserModel.deleteOne(user);
    res.status(200).json({
        message: `User with id ${userId} deleted successfully`
    });
}


//get subscription details of user by id
exports.getSubscriptionDetailsById=async function(req,res){
    const userId=req.params.id;
    const user=await UserModel.findById(userId);

    if(!user){
        return res.status(404).json({
            message:`User with id ${userId} not found`
        });
    }
    // convert date → days
    const getDateInDays=(data='')=>{
        let date=data?new Date(data):new Date();
        return Math.floor(date.getTime()/(1000*60*60*24));
    };
    // calculate subscription expiry
    const subscriptionType=(subscriptionDate)=>{
        let date=subscriptionDate;
        if(user.subscriptionType==='Basic'){
            date+=90;
        }
        else if(user.subscriptionType==='Standard'){
            date+=180;
        }
        else if(user.subscriptionType==='Premium'){
            date+=365;
        }
        return date;
    };
    const returnDate=getDateInDays(user.returnDate);
    const currentDate=getDateInDays();
    const subscriptionDate=getDateInDays(user.subscriptionDate);
    const subscriptionExpiration=subscriptionType(subscriptionDate);
    const data={
        ...user._doc,
        subscriptionExpired:subscriptionExpiration<currentDate,
        subscriptionDaysLeft:subscriptionExpiration-currentDate,
        daysLeftForReturn:returnDate-currentDate,
        fine:
        returnDate<currentDate
        ?subscriptionExpiration<=currentDate
        ?200
        :100
        :0
    };
    return res.status(200).json({
        message:'Subscription details retrieved successfully',
        data
    });
};


    