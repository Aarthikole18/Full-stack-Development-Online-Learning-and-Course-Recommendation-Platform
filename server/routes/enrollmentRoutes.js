const express = require("express");
const router = express.Router();

const {
  enrollCourse,
  getMyCourses,
  updateProgress,
} = require("../controllers/enrollmentController");

const { protect } = require("../middleware/authMiddleware");

// ENROLL
router.post("/", protect, enrollCourse);

// MY COURSES
router.get("/my-courses", protect, getMyCourses);

// UPDATE PROGRESS
router.put("/progress", protect, updateProgress);

module.exports = router;