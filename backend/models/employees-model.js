const mongoose = require("mongoose");
const { emailRegex } = require("../utils/constant");

const employeesSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  employeeName: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: [true, "Email required"],
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function (value) {
        return emailRegex.test(value);
      },
      message: "Email is not valid",
    },
  },
  phoneNumber: {
    type: String,
    required: true,
  },

  daysWorkedInCafe: {
    type: Number,
  },
  cafeId: {
    type: String,
  },
  cafeName: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Employee = mongoose.model("Employee", employeesSchema);

module.exports = { Employee };
