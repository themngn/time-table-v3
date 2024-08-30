const Class = require("../models/class.model");

const getClasses = async (req, res) => {
    try {
        const classes = await Class.find({});
        res.status(200).json(classes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createClass = async (req, res) => {
    try {
        const c_class = await Class.create(req.body);
        res.status(201).json(c_class);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getClass = async (req, res) => {
    try {
        const c_class = await Class.findById(req.params.id);
        if (!c_class) {
            return res.status(404).json({ message: "Class not found" });
        }
        res.status(200).json(c_class);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateClass = async (req, res) => {
    try {
        const { id } = req.params;
        const c_class = await Class.findByIdAndUpdate(id, req.body);
        if (!c_class) {
            return res.status(404).json({ message: "Class not found" });
        }
        const updatedClass = await Class.findById(id);
        res.status(200).json(updatedClass);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteClass = async (req, res) => {
    try {
        const { id } = req.params;
        const c_class = await Class.findByIdAndDelete(id);
        if (!c_class) {
            return res.status(404).json({ message: "Class not found" });
        }
        res.status(200).json({ message: "Class deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getClasses,
    createClass,
    getClass,
    updateClass,
    deleteClass,
};
