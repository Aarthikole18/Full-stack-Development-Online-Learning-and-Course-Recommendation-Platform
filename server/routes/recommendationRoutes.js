const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

const router = express.Router();

/**
 * GET RECOMMENDED COURSES
 * Based on user's enrolled categories & skills
 */
router.get("/", protect, async (req, res) => {
  try {
    // 1. Get user enrollments with course details
    const enrollments = await Enrollment.find({
      user: req.user.id,
    }).populate("course");

    if (enrollments.length === 0) {
      const allCourses = await Course.find().limit(5);
      return res.json({
        success: true,
        message: "No enrollments yet, showing popular courses",
        recommendations: allCourses,
      });
    }

    // 2. Collect categories user is interested in
    const categories = enrollments.map((e) => e.course.category);

    // 3. Collect skills user is learning
    const skills = enrollments.flatMap((e) => e.course.skills || []);

    // 4. Find recommended courses
    const recommendations = await Course.find({
      $or: [
        { category: { $in: categories } },
        { skills: { $in: skills } },
      ],
    }).limit(10);

    res.json({
      success: true,
      message: "Recommended courses fetched",
      recommendations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;