const Course = require("../models/Course");

// GET COURSES
const getCourses = async (req, res) => {
  const courses = await Course.find();
  res.json({ success: true, courses });
};

// CREATE COURSE
const createCourse = async (req, res) => {
  const course = await Course.create(req.body);

  res.json({
    success: true,
    course,
  });
};

module.exports = {
  getCourses,
  createCourse,
};