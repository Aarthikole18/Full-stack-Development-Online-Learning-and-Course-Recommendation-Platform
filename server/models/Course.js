const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  instructor: String,
  category: String,
});

module.exports = mongoose.model("Course", courseSchema);