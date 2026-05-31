const Enrollment = require("../models/Enrollment");

// ENROLL COURSE
const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const exists = await Enrollment.findOne({
      user: req.user.id,
      course: courseId,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Already Enrolled",
      });
    }

    const enrollment = await Enrollment.create({
      user: req.user.id,
      course: courseId,
      progress: 0,
      completed: false,
    });

    res.status(201).json({
      success: true,
      message: "Course Enrolled Successfully",
      enrollment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
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
      count: enrollments.length,
      enrollments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
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
    if (progress >= 100) enrollment.completed = true;

    await enrollment.save();

    res.json({
      success: true,
      message: "Progress Updated",
      enrollment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  enrollCourse,
  getMyCourses,
  updateProgress,
};