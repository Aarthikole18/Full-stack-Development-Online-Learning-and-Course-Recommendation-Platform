const Enrollment = require("../models/Enrollment");

// ENROLL
const enrollCourse = async (req, res) => {
  const { courseId } = req.body;

  const enrollment = await Enrollment.create({
    user: req.user._id,
    course: courseId,
  });

  res.json({
    success: true,
    enrollment,
  });
};

// MY COURSES
const getMyCourses = async (req, res) => {
  const data = await Enrollment.find({
    user: req.user._id,
  }).populate("course");

  res.json({
    success: true,
    enrollments: data,
  });
};

// UPDATE PROGRESS
const updateProgress = async (req, res) => {
  const { enrollmentId, progress } = req.body;

  const enrollment = await Enrollment.findById(enrollmentId);

  if (!enrollment) {
    return res.status(404).json({ message: "Not found" });
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
};

module.exports = {
  enrollCourse,
  getMyCourses,
  updateProgress,
};