const { Employee } = require("../models/employees-model");
const { Cafe } = require("../models/cafe-model");
const { generateId, generateNumber, getToday } = require("./helper");

const createEmployee = async (employeeObj) => {
  return await Employee.create(employeeObj);
};

const updateCafeWithEmployee = async (cafeId, employeeId) => {
  await Cafe.findOneAndUpdate(
    { cafeId: cafeId },
    { $push: { employees: employeeId } },
    { new: true, upsert: true }
  );
};

const generateEmployeeObj = (
  gender,
  phoneNumber,
  emailAddress,
  employeeName,
  cafeOption
) => {
  const employeeObj = {
    employeeId: generateId("UI"),
    startDate: getToday(),
    gender,
    phoneNumber,
    emailAddress,
    employeeName,
    daysWorkedInCafe: generateNumber(1, 30),
    cafeId: cafeOption?.value,
    cafeName: cafeOption?.placeName,
  };

  return employeeObj;
};

const findEmployeeById = async (id) => {
  return await Employee.findOne({ employeeId:id });
};

const updateEmployeeData = async (id, employeeData, cafeOption) => {
  const update = {
    ...employeeData,
    cafeName: cafeOption.placeName,
    cafeId: cafeOption.value,
  };

  return await Employee.findOneAndUpdate(
    { id },
    { $set: update },
    { new: true }
  );
};

const updateCafeWithEmployeeId = async (cafeId, employeeId) => {
  return await Cafe.findOneAndUpdate(
    { cafeId },
    { $push: { employees: employeeId } },
    { new: true }
  );
};

const updatePreviousCafeWithEmployeeId = async (cafeId, employeeId) => {
  return await Cafe.findOneAndUpdate(
    { cafeId },
    { $pull: { employees: employeeId } },
    { new: true }
  );
};

module.exports = {
  saveEmployee: createEmployee,
  updateCafeWithEmployee,
  generateEmployeeObj,
  findEmployeeById,
  updateEmployeeData,
  updateCafeWithEmployeeId,
  updatePreviousCafeWithEmployeeId,
};
