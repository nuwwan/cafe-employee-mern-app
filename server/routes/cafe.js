const express = require("express");
const router = express.Router();
const { requestValidator } = require("../middleWare/request-validator");
const { cafeCreateValidationRules } = require("../validation/cafe-validation");

const {
  getCafes,
  createCafe,
  deleteCafe,
  updateCafe,
} = require("../controllers/cafe-controller");

router.get("/", getCafes);
router.post("/", cafeCreateValidationRules, requestValidator, createCafe);
router.put("/:id", updateCafe);
router.delete("/:id", deleteCafe);

module.exports = router;
