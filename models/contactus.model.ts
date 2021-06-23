import mongoose, { Schema } from "mongoose";

// Define User Schema
const contactUs_Schema: Schema = new Schema(
    {
        name: String,
        email: String,
        message: String
    },
    {timestamps: true}
);

export default mongoose.model('ContactUs', contactUs_Schema);
