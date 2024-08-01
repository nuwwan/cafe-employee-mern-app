const mongoose = require("mongoose");

const cafeSchema = new mongoose.Schema({
  cafeName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  cafeId: {
    type: String,
    required: true,
    unique: true,
  },
  employees: {
    type: [String],
  },
});

const Cafe = mongoose.model("Cafe", cafeSchema);

module.exports = { Cafe };
