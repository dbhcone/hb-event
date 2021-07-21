import Joi from "@hapi/joi";

const objectSchema = Joi.object({
  name: Joi.string().required().min(5),
  // custom error messages
  /*
  .messages({
    "string.base": `'name' should be a type of 'text'`,
    "string.empty": `'name' cannot be an empty field`,
    "string.min": `'name' should have a minimum length of {#limit}`,
    "any.required": `'name' is a required field`,
  }),
  */
  email: Joi.string().email().required().messages({}),
  message: Joi.string().required(),
});

export { objectSchema as contactusValidation };
