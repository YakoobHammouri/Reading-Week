const joi = require('@hapi/joi');

const registrationValidation = data => {
  const schema = joi
    .object({
      name: joi
        .string()
        .alphanum()
        .min(3)
        .required(),
      email: joi
        .string()
        .min(6)
        .required()
        .email(),
      phone: joi
        .number()
        .min(8)
        .required(),
      password: joi
        .string()
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      repassword: joi.ref('password')
    })
    .with('password', 'repassword');

  return schema.validate(data);
};

const logInValidation = data => {
  const schema = {
    email: joi
      .string()
      .min(6)
      .required()
      .email(),
    password: joi
      .string()
      .min(6)
      .required()
  };

  return joi.valid(data, schema);
};

const V4UUIDValidation = uuid => {
  const uuidV4Regex = /^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i;
  return uuidV4Regex.test(uuid);
};

module.exports = { registrationValidation, logInValidation, V4UUIDValidation };