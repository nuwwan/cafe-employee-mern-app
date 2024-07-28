const { Cafe } = require("../models/cafe-model");
const { Employee } = require("../models/employees-model");
const { generateId } = require("./helper");

const cafeFindAndUpdates = async (id, updateData) => {
  return await Cafe.findOneAndUpdate(
    { cafeId: id },
    { $set: updateData },
    { new: true }
  ).lean();
};

const createCafe = async (cafeObject) => {
  const cafe = new Cafe(cafeObject);
  return await cafe.save();
};

const resetCafeDetailsFromEmployees = async (deletedCafe) => {
  if (deletedCafe.employees.length > 0) {
    await Employee.updateMany(
      { cafeId: deletedCafe.cafeId },
      { $unset: { cafeId: "", cafeName: "" } }
    );
  }
};

const addNumberEmployees = (cafe) => {
  return {
    ...cafe,
    numberOfEmployees: cafe.employees.length,
  };
};

const getUpdatedCafe = (cafe) => {
  return {
    cafeName: cafe.cafeName,
    description: cafe.description,
    location: cafe.location,
    cafeId: cafe.cafeId,
    numberOfEmployees: cafe.employees.length,
    logo: cafe.logo,
  };
};

const createCafeObject = (cafeName, description, location, logo) => {
  const cafeId = generateId("CA");

  return {
    cafeName,
    description,
    location,
    cafeId,
    logo,
  };
};

const deleteCafe = async (cafeId) => {
  return await Cafe.findOneAndDelete({ cafeId });
};

module.exports = {
  cafeFindAndUpdates,
  addNumberEmployees,
  getUpdatedCafe,
  createCafe,
  createCafeObject,
  deleteCafe,
  resetCafeDetailsFromEmployees,
};
