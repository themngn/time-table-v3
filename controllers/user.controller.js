const User = require("../models/user.model");
const Group = require("../models/group.model");
const Course = require("../models/course.model");
const Class = require("../models/class.model");

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//get all possible choices of a user from all groups
const getAllPossibleChoices = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate({
            path: "groups",
            populate: {
                path: "subchoices",
                populate: { path: "subgroups" },
            },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const choices = user.groups.reduce((acc, group) => {
            acc.push(...group.subchoices);
            return acc;
        }, []);
        res.status(200).json(choices);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//get all gropus of a user, then get all courses of each group, then get all classes of each course
const getTimetable = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate({
            path: "groups",
            populate: {
                path: "courses",
                populate: { path: "classes" },
            },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const classes = user.groups.reduce((acc, group) => {
            group.courses.forEach((course) => {
                acc.push(...course.classes);
            });
            return acc;
        }, []);
        res.status(200).json(classes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getTimetable,
    getAllPossibleChoices,
};
