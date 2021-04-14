//Import Joi Module
const Joi = require('@hapi/joi');

//Sing Up Schema
const signupSchema = Joi.object({
        account: {
                    email: Joi.string().email().required().min(3),
                    username: Joi.string().required().min(5), 
                    // password: Joi.string().required().min(5).regex(/[A-z][a-z][0-9]/), 
                    password: Joi.string().required().min(8), 
                    user_company_name: Joi.string(), 
                    address: Joi.string(), 
                    city: Joi.string(), 
                    state_province: Joi.string(), 
                    postal_zip: Joi.string(), 
                    country: Joi.string(), 
                    skype: Joi.string(), 
                    tel: Joi.string(), 
                    interest: Joi.string(), 
                    agree_with_terms: Joi.boolean().required(), 
                    isnotified: Joi.boolean()
                }
});

const account_activation_Schema = Joi.object({
                    email: Joi.string().email().required().min(3), 
                    temp_code: Joi.string().min(4).max(4).required().regex(/[0-9]/),
                    token: Joi.string()
});

const login_Schema = Joi.object({
        users: {
                    email: Joi.string().email().min(3),
                    username: Joi.string().min(5), 
                    password: Joi.string().required().min(8),
                }

});

const forgot_Password_Schema = Joi.object({
                   email: Joi.string().email().required().min(3)
});

const password_reset = Joi.object({
        password_reset: {
                    email: Joi.string().email().required().min(3),
                    password: Joi.string().required().min(8)
                     }
});

module.exports = {
    signupSchema, account_activation_Schema, login_Schema, forgot_Password_Schema, password_reset
};