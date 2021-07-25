//Import Mongoose Module
import mongoose, {Schema} from 'mongoose';

//Define Temp User Schema
const temp_users_Schema: Schema = new Schema({
  token: String,
  expiresIn: String,
  email: String,
  username: String,
  password: String,
  hash: String,
  temp_code: String,
});

//Initialize Schema
const TempUser = mongoose.model("TempUser", temp_users_Schema);

//Export Schema
module.exports = TempUser;
