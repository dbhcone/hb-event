//Import @hapi/joi
// const Joi = require("@hapi/joi");
import Joi from '@hapi/joi';

//Define Contact Us Schema

const contactUs_Schema = Joi.object({
  name: Joi.string().required().min(5).messages({
    "string.base": `'name' should be a type of 'text'`,
    "string.empty": `'name' cannot be an empty field`,
    "string.min": `'name' should have a minimum length of {#limit}`,
    "any.required": `'name' is a required field`,
  }),
  email: Joi.string().email().required().messages({
      
  }),
  message: Joi.string().required(),
});

export {contactUs_Schema}

//Export Schema
// module.exports = {
//   contactUs_Schema,
// };

