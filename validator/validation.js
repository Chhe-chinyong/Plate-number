const Filter = require("bad-words");
const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));
filter = new Filter({ placeHolder: "#" });
// Add bad words
filter.addWords("KDET", "KDOR", "KDMV");
var d = new Date();

//WordValidation
const wordValidation = function WordValidation(name) {
  const nb = name.length; //count nb
  const check = filter.isProfane(name); // true is bad , false is appropriate
  if (check) {
    return { error: "pls use appropriate word", check: true };
  }
  if (nb > 8 || nb < 4) {
    return { error: "words are from 4-8 ", check: true };
  }

  return false;
};

//RegisterValidation
const registerValidation = data => {
  const schema = Joi.object({
    phone: Joi.string()
      .regex(/^\d{3}-\d{3}-\d{3,4}$/)
      .required(),
    password: Joi.string()
      .min(8)
      .max(32)
      .regex(/(?=.*[A-Z])(?=.*[a-z])/)
      .required(),
    password_confirmation: Joi.any()
      .valid(Joi.ref("password"))
      .required(),
    email: Joi.string()
      .trim()
      .email()
      .required(),
    address: Joi.string()
      .trim()
      .required(),
    DOB: Joi.date()
      .required()
      .format(["YYYY/MM/DD", "DD-MM-YYYY", "DD/MM/YYYY", "YYYY-MM-DD"]) // String
      .raw()
  });
  return schema.validate(data);
};

//LoginValidation
const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
  });
  return schema.validate(data);
};

module.exports.wordValidation = wordValidation;
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
