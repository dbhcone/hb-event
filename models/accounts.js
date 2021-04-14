//Import Mongoose Module
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Import TempUser Schema
const Users = require('./users');

//Define Accounts Schema
const accounts_Schema = mongoose.Schema(
    {
        userid: String, 
        user_company_name: String, 
        address: String, 
        city: String, 
        state_province: String, 
        postal_zip: String, 
        country: String, 
        skype: String, 
        tel: String, 
        interest: String, 
        agree_with_terms: Boolean, 
        isnotified: Boolean
   }
);

//Initialize Schem
const Accounts = mongoose.model('Accounts', accounts_Schema);

//Export Module
module.exports = Accounts;