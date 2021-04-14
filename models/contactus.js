//Import Mongoose
const mongoose = require('mongoose');

// Define User Schema
const contactUs_Schema = mongoose.Schema(
    {
    name: String,
    email: String,
    message: String
    },
    {timestamps: true}
);

// Initialize Schema
const ContactUs = mongoose.model('ContactUs', contactUs_Schema);

//Export Module
module.exports = ContactUs;