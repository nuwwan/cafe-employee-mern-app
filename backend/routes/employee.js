const express = require("express");
const router = express.Router();

const { requestValidator } = require("../middleWare/request-validator");
const {
  employeeCreateValidationRules,
} = require("../validation/employee-validation");

const {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employee-controller");

router.get("/", getEmployees);
router.post(
  "/",
  employeeCreateValidationRules,
  requestValidator,
  createEmployee
);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
