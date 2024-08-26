const express = require("express");
const Course = require("../models/course.model");
const router = express.Router();
const {
    getCourses,
    createCourse,
    getCourse,
    updateCourse,
    deleteCourse,
    getCourseClasses,
    createClass,
} = require("../controllers/course.controller");

router.get("/", getCourses);
router.post("/", createCourse);
router.get("/:id", getCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);
router.get("/:id/classes", getCourseClasses);
router.post("/:id/classes", createClass);

module.exports = router;
