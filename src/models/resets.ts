//Import Mongoose Module
import mongoose, { Schema } from "mongoose";

//Define Password Reset Schema
const resetSchema = new Schema({
  email: String,
  temp_token: String,
});

//Initialize Schema
export default mongoose.model("Resets", resetSchema);
