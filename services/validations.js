const Joi = require('joi');

const nameSchema = Joi.string().min(5).required().messages({
  'string.min': '422|"name" length must be at least 5 characters long',
  'string.empty': '400|"name" is required',
  'any.required': '400|"name" is required',
});

const validateName = (string) => {
  const result = nameSchema.validate(string);
  if ('error' in result) {
    const [code, message] = result.error.details[0].message.split('|');
    return { code, message };
  }
  return true;
};

module.exports = {
  validateName,
};
