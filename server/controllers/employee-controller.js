const { Employee } = require("../models/employees-model");
const { Cafe } = require("../models/cafe-model");
const asyncHandler = require("express-async-handler");
const { throwError } = require("../utils/helper");
const {
  saveEmployee,
  updateCafeWithEmployee,
  generateEmployeeObj,
  findEmployeeById,
  updateEmployeeData,
  updateCafeWithEmployeeId,
  updatePreviousCafeWithEmployeeId,
} = require("../utils/employee-utils");
const { ERROR_STATUS_CODE, EMPLOYEE_ERROR } = require("../utils/constant");

// Fetch employees with optional cafe filter
const getEmployees = asyncHandler(async (req, res, next) => {
  const cafeId = req.query.cafe;

  try {
    const query = cafeId ? Employee.find({ cafeId }) : Employee.find({});
    const employees = await query.exec();

    res.status(200).json({ status: "OK", employees });
  } catch (error) {
    throwError(
      EMPLOYEE_ERROR.EMPLOYEES_FETCH_FAILED,
      ERROR_STATUS_CODE.SERVER_ERROR_500,
      next
    );
  }
});

// Create a new employee
const createEmployee = asyncHandler(async (req, res, next) => {
  try {
    const { gender, phoneNumber, emailAddress, employeeName, cafeOption } =
      req.body;
    const employeeObj = generateEmployeeObj(
      gender,
      phoneNumber,
      emailAddress,
      employeeName,
      cafeOption
    );
    const savedEmployee = await saveEmployee(employeeObj);

    if (savedEmployee.cafeId) {
      await updateCafeWithEmployee(
        savedEmployee.cafeId,
        savedEmployee.employeeId
      );
    }

    res.status(200).json({ status: "OK", employee: savedEmployee });
  } catch (error) {
    throwError(
      EMPLOYEE_ERROR.EMPLOYEE_CREATE_FAILED,
      ERROR_STATUS_CODE.SERVER_ERROR_500,
      next
    );
  }
});

// Update an existing employee
const updateEmployee = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { cafeOption, prvCafeId, ...employeeData } = req.body;

    const employee = await findEmployeeById(id);
    if (!employee) {
      return throwError(
        EMPLOYEE_ERROR.EMPLOYEE_NOT_FOUND,
        ERROR_STATUS_CODE.NOT_FOUND_404,
        next
      );
    }

    const updatePromises = [
      updateEmployeeData(id, employeeData, cafeOption.value),
    ];

    if (cafeOption.value) {
      updatePromises.push(
        updateCafeWithEmployeeId(cafeOption.value, employee.employeeId)
      );
    }

    if (prvCafeId) {
      updatePromises.push(
        updatePreviousCafeWithEmployeeId(prvCafeId, employee.employeeId)
      );
    }

    const [updatedEmployee] = await Promise.all(updatePromises);

    res.status(200).json({ status: "OK", employee: updatedEmployee });
  } catch (error) {
    throwError(
      EMPLOYEE_ERROR.EMPLOYEE_UPDATE_FAILED,
      ERROR_STATUS_CODE.SERVER_ERROR_500,
      next
    );
  }
});

// Delete an employee
const deleteEmployee = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return throwError(
      EMPLOYEE_ERROR.EMPLOYEE_DELETE_FAILED,
      ERROR_STATUS_CODE.NOT_FOUND_404,
      next
    );
  }

  try {
    const employee = await Employee.findOneAndDelete({ employeeId: id });

    if (employee && employee.cafeId) {
      const updatedCafe = await Cafe.updateOne(
        { cafeId: employee.cafeId },
        { $pull: { employees: employee.employeeId } },
        { new: true }
      );

      if (updatedCafe.matchedCount && updatedCafe.modifiedCount) {
        console.info("Updated cafe with employee id");
      }
    }

    res.status(200).json({ status: "OK", employee });
  } catch (error) {
    throwError(
      EMPLOYEE_ERROR.EMPLOYEE_DELETE_FAILED,
      ERROR_STATUS_CODE.SERVER_ERROR_500,
      next
    );
  }
});

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
