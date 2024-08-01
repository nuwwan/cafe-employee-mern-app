const { body } = require("express-validator");

const cafeCreateValidationRules = [
  body("cafeName")
    .exists({ checkFalsy: true })
    .isString()
    .trim()
    .withMessage("Cafe Name must be provided and must be a valid name"),
  body("description")
    .exists({ checkFalsy: true })
    .isString()
    .trim()
    .withMessage("Description must be provided and must be a valid description"),
  body("location")
    .exists({ checkFalsy: true })
    .isString()
    .trim()
    .withMessage("Location must be provided and must be a valid location'"),
];

module.exports = { cafeCreateValidationRules };
