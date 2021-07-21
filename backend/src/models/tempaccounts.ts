//Import Mongoose Module
// const mongoose = require("mongoose");
import mongoose, { Schema } from 'mongoose';


//Import TempUser Schema
const TempUser = require("./tempusers");

//Define Temp Accounts Schema
const temp_accounts_Schema: Schema = new Schema({
  temp_userid: { type: mongoose.Schema.Types.ObjectId, ref: TempUser },
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
  isnotified: Boolean,
});

//Initialize Schem
const TempAccounts = mongoose.model("TempAccounts", temp_accounts_Schema);

//Export Module
module.exports = TempAccounts;
