const { body } = require("express-validator");

const employeeCreateValidationRules = [
  body("gender")
    .exists({ checkFalsy: true })
    .isString()
    .trim()
    .withMessage("Gender must be provided and must be a valid value"),

  body("phoneNumber")
    .exists({ checkFalsy: true })
    .isString()
    .trim()
    .withMessage("Phone Number must be provided and must be a valid value"),

  body("emailAddress")
    .exists({ checkFalsy: true })
    .isString()
    .trim()
    .withMessage("Email Address must be provided and must be a valid value"),

  body("employeeName")
    .exists({ checkFalsy: true })
    .isString()
    .trim()
    .withMessage("Employee Name must be provided and must be a valid value"),
];

module.exports = { employeeCreateValidationRules };
