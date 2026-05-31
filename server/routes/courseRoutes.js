const express = require("express");
const router = express.Router();

const courseController = require("../controllers/courseController");

// GET ALL COURSES
router.get("/", courseController.getCourses);

// CREATE COURSE
router.post("/", courseController.createCourse);

module.exports = router;