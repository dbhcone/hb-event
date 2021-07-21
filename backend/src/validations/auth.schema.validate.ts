import Joi from "@hapi/joi";
// email: { type: String, required: true, unique: true },
//   lastName: { type: String, required: true },
//   firstName: { type: String, required: true },
//   otherNames: { type: String },
//   gender: { type: String },
//   mobileNumber: { type: String, required: true },
//   address: { type: String },
//Sing Up Schema
const signupSchema = Joi.object({
  email: Joi.string().email().required().min(5),
  lastName: Joi.string().required().min(3),
  firstName: Joi.string().required().min(3),
  otherNames: Joi.string(),
  gender: Joi.string().required(),
  username: Joi.string().required().min(5),
  password: Joi.string().required().min(8),
  address: Joi.string().min(20),
  mobileNumber: Joi.string().required().length(10),
});

const accountActivationSchema = Joi.object({
  email: Joi.string().email().required().min(3),
  tempCode: Joi.string().length(6).required().regex(/[0-9]/),
  token: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().email(),
  username: Joi.string(),
  password: Joi.string().required(),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

const passwordReset = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export {
  signupSchema,
  accountActivationSchema,
  loginSchema,
  forgotPasswordSchema,
  passwordReset,
};
