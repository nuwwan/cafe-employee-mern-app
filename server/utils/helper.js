const mongoose = require("mongoose");

const generateId = (uq) => {
  return `${uq}${new mongoose.Types.ObjectId()}`.toUpperCase();
};

const generateNumber = (min = 10, max = 99) => {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

const throwError = (msg, code, next) => {
  let error = new Error(msg);
  error.statusCode = code;
  next(error);
};

const getToday = () =>
  new Intl.DateTimeFormat(["ban", "id"]).format(new Date());

module.exports = {
  generateId,
  getToday,
  generateNumber,
  throwError,
};
