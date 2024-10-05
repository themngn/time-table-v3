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
                for (let i = 0; i < course.classes.length; i++) {
                    let temp = acc[acc.length - i - 1].toObject();
                    temp.course = course.name;
                    acc[acc.length - i - 1] = temp;
                }
            });
            return acc;
        }, []);
        let new_acc = {
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
            Sunday: [],
        };
        //group by day_of_week
        for (let i = 0; i < classes.length; i++) {
            let day = classes[i].day_of_week;
            new_acc[day] = new_acc[day] || [];
            new_acc[day].push(classes[i]);
        }
        //sort by start_time then biweekly_week (8:40 -> 10:00 odd -> 10:00 even) (if time starts from x:00, then add 0 to the start before sorting)
        for (let day in new_acc) {
            new_acc[day].sort((a, b) => {
                let a_start = a.start_time.split(":");
                let b_start = b.start_time.split(":");
                if (a_start[1] === "00") {
                    a_start[1] = "0";
                }
                if (b_start[1] === "00") {
                    b_start[1] = "0";
                }
                if (a_start[0] !== b_start[0]) {
                    return a_start[0] - b_start[0];
                } else {
                    if (a.biweekly_week && !b.biweekly_week) {
                        return -1;
                    } else if (!a.biweekly_week && b.biweekly_week) {
                        return 1;
                    } else {
                        return a_start[1] - b_start[1];
                    }
                }
            });
        }

        res.status(200).json(new_acc);
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
