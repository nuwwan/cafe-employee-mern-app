const { validationResult } = require("express-validator");

const requestValidator = (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    next();
  } else {
    res.send(result.array());
  }
};

module.exports = { requestValidator };
