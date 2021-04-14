//Import @hapi/joi
const Joi = require('@hapi/joi');

//Define Contact Us Schema

const contactUs_Schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    message: Joi.string().required()
});


//Export Schema
module.exports = {
    contactUs_Schema, 
}