const express = require("express");

const {
  createCourse,
  getCourses,
  getCourse,
} = require("../controllers/courseController");

const router = express.Router();

// Create Course
router.post("/", createCourse);

// Get All Courses
router.get("/", getCourses);

// Get Single Course
router.get("/:id", getCourse);

module.exports = router;
