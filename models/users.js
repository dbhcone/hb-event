//Import Mongoose Module
const mongoose = require('mongoose');

//Define Users Schema
const users_Schema = mongoose.Schema(
    { 
        email: String, 
        username: String, 
        password: String
    }
);

//Initialize Schema
const Users = mongoose.model('Users', users_Schema);

//Export Schema
module.exports = Users;