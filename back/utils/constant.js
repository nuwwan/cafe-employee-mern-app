const ERROR_MESSAGE = {
  ALL_FIELDS_ARE_REQUIRED: "All fields are required",
  NOT_FOUND: "Not found",
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden",
  SERVER_ERROR: "Server error",
  BAD_REQUEST: "Bad request",
  DEFAULT: "Something went wrong",
};

const STATUS_CODE = {
  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404,
  UNAUTHORIZED_401: 401,
  FORBIDDEN_403: 403,
  SERVER_ERROR_500: 500,
};

const CAFE_ERROR = {
  CAFE_DELETE_FAILED: "Unable to Delete Cafe",
  CAFE_UPDATE_FAILED: "Cafe updating failed",
  CAFE_CREATE_FAILED: "Cafe creation failed",
  CAFES_FETCH_FAILED: "Cafes fetching failed",
  CAFE_NOT_FOUND: "Cafe not found",
};

const EMPLOYEE_ERROR = {
  EMPLOYEE_DELETE_FAILED: "Unable to Delete Employee",
  EMPLOYEE_UPDATE_FAILED: "Employee updating failed",
  EMPLOYEE_CREATE_FAILED: "Employee creation failed",
  EMPLOYEES_FETCH_FAILED: "Employees fetching failed",
  EMPLOYEE_NOT_FOUND: "Employee not found",
};

const emailRegexMatch = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

module.exports = {
  emailRegex: emailRegexMatch,
  ERROR_MESSAGE,
  ERROR_STATUS_CODE: STATUS_CODE,
  CAFE_ERROR,
  EMPLOYEE_ERROR,
};
