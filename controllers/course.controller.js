const Course = require("../models/course.model");
const Class = require("../models/class.model");

const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({});
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findByIdAndUpdate(id, req.body);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        const updatedCourse = await Course.findById(id);
        res.status(200).json(updatedCourse);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findByIdAndDelete(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ message: "Course deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getCourseClasses = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id).populate("classes");
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course.classes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//create class and add it to a course
const createClass = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        const newClass = await Class.create(req.body);
        course.classes.push(newClass);
        await course.save();
        res.status(201).json(newClass);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getCourses,
    createCourse,
    getCourse,
    updateCourse,
    deleteCourse,
    getCourseClasses,
    createClass,
};
