const Enrollment = require("../models/Enrollment");

// ENROLL COURSE
const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const enrollment = await Enrollment.create({
      user: req.user.id,
      course: courseId,
    });

    res.json({
      success: true,
      enrollment,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Enroll failed",
    });
  }
};

// GET MY COURSES
const getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      user: req.user.id,
    }).populate("course");

    res.json({
      success: true,
      enrollments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
};

// UPDATE PROGRESS
const updateProgress = async (req, res) => {
  try {
    const { enrollmentId, progress } = req.body;

    const enrollment = await Enrollment.findById(enrollmentId);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found",
      });
    }

    enrollment.progress = progress;

    if (progress >= 100) {
      enrollment.completed = true;
    }

    await enrollment.save();

    res.json({
      success: true,
      enrollment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Progress update failed",
      error: error.message,
    });
  }
};

module.exports = {
  enrollCourse,
  getMyCourses,
  updateProgress,
};