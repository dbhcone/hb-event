//Import Mongoose Module
const mongoose = require('mongoose');

//Define Password Reset Schema
const reset_Schema = mongoose.Schema(
    { 
        email: String, 
        temp_token: String
    }
);

//Initialize Schema
const Reset = mongoose.model('Reset', reset_Schema);

//Export Schema
module.exports = Reset;