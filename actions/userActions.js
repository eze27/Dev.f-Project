const { Users,Restaurant } = require('../models');

const createUser = (data) => {
   return Users.create(data);
}

const getUserByEmail = (email,typeUser) => {
    if (typeUser === 'USER1' ) {
        return Users.findOne({ email: email });
    }else{
        return Restaurant.findOne({ email: email });
    }
   
}

const getUserById = (_id) => {
    return Restaurant.findOne({ _id: _id });
}

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
}