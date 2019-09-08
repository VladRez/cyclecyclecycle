const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateRegisterInput(data) {
  let errors = "";

  data.fname = validText(data.fname) ? data.fname : "";
  data.lname = validText(data.lname) ? data.lname : "";
  data.email = validText(data.email) ? data.email : "";
  data.password = validText(data.password) ? data.password : "";
  data.password2 = validText(data.password2) ? data.password2 : "";

  if (Validator.isEmpty(data.fname)) {
    return { error: "First name field is required", isValid: false };
  }
  if (Validator.isEmpty(data.lname)) {
    return { error: "Last name field is required", isValid: false };
  }

  if (Validator.isEmpty(data.email)) {
    return { error: "Email field is required", isValid: false };
    n;
  }

  if (!Validator.isEmail(data.email)) {
    return { error: "Email is invalid", isValid: false };
  }

  if (Validator.isEmpty(data.password)) {
    return { error: "Password field is required", isValid: false };
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    return { error: "Password must be at least 6 characters", isValid: false };
  }

  if (Validator.isEmpty(data.password2)) {
    return { error: "Confirm Password field is required", isValid: false };
  }

  if (!Validator.equals(data.password, data.password2)) {
    return { error: "Passwords must match", isValid: false };
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
