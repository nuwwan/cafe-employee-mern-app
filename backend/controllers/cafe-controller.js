const { Cafe } = require("../models/cafe-model");
const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { throwError } = require("../utils/helper");
const {
  findAndUpdateCafe,
  addNumberOfEmployees,
  getUpdatedCafe,
  createCafeInDatabase,
  createCafeObject,
  findAndDeleteCafe,
  unsetCafeDetailsFromEmployees,
} = require("../utils/cafe-utils");
const { ERROR_STATUS_CODE, CAFE_ERROR } = require("../utils/constant");

// Handler to fetch cafes
const getCafes = asyncHandler(async (req, res, next) => {
  const { location } = req.query;
  const locationQuery = location ? new RegExp(location, "i") : {};

  try {
    const cafes = await Cafe.aggregate([
      { $match: locationQuery },
      {
        $project: {
          cafeName: 1,
          description: 1,
          logo: 1,
          location: 1,
          cafeId: 1,
          numberOfEmployees: { $size: "$employees" },
        },
      },
      { $sort: { numberOfEmployees: -1 } },
    ]);

    res.status(200).json({
      status: "OK",
      cafes,
    });
  } catch (error) {
    handleError(
      next,
      CAFE_ERROR.CAFES_FETCH_FAILED,
      ERROR_STATUS_CODE.SERVER_ERROR_500
    );
  }
});

// Handler to create a new cafe
const createCafe = asyncHandler(async (req, res, next) => {
  const { cafeName, description, location, logo } = req.body;

  try {
    const cafeObject = createCafeObject(cafeName, description, location, logo);
    const cafe = await createCafeInDatabase(cafeObject);
    const updatedCafe = getUpdatedCafe(cafe);

    res.status(200).json({
      status: "OK",
      cafe: updatedCafe,
    });
  } catch (error) {
    handleError(
      next,
      CAFE_ERROR.CAFE_CREATE_FAILED,
      ERROR_STATUS_CODE.SERVER_ERROR_500
    );
  }
});

// Handler to update an existing cafe
const updateCafe = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedCafe = await findAndUpdateCafe(id, req.body);
    if (!updatedCafe) {
      handleError(
        next,
        CAFE_ERROR.CAFE_NOT_FOUND,
        ERROR_STATUS_CODE.NOT_FOUND_404
      );
      return;
    }
    const cafeWithEmployeeCount = addNumberOfEmployees(updatedCafe);
    res.status(200).json({
      status: "OK",
      cafe: cafeWithEmployeeCount,
    });
  } catch (error) {
    handleError(
      next,
      CAFE_ERROR.CAFE_UPDATE_FAILED,
      ERROR_STATUS_CODE.SERVER_ERROR_500
    );
  }
});

// Handler to delete a cafe
const deleteCafe = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedCafe = await findAndDeleteCafe(id);
    if (!deletedCafe) {
      handleError(
        next,
        CAFE_ERROR.CAFE_DELETE_FAILED,
        ERROR_STATUS_CODE.NOT_FOUND_404
      );
      return;
    }

    await unsetCafeDetailsFromEmployees(deletedCafe);

    res.status(200).json({
      status: "OK",
      cafe: deletedCafe,
    });
  } catch (error) {
    handleError(
      next,
      CAFE_ERROR.CAFE_DELETE_FAILED,
      ERROR_STATUS_CODE.SERVER_ERROR_500
    );
  }
});

// Common error handler
function handleError(next, message, statusCode) {
  throwError(message, statusCode, next);
}

module.exports = { getCafes, createCafe, updateCafe, deleteCafe };
