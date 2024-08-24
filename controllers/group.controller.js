const Group = require("../models/group.model");

const getGroups = async (req, res) => {
    try {
        const groups = await Group.find({});
        res.status(200).json(groups);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createGroup = async (req, res) => {
    try {
        const group = await Group.create(req.body);
        res.status(201).json(group);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getGroup = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }
        res.status(200).json(group);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const group = await Group.findByIdAndUpdate(id, req.body);
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }
        const updatedGroup = await Group.findById(id);
        res.status(200).json(updatedGroup);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const group = await Group.findByIdAndDelete(id);
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }
        res.status(200).json({ message: "Group deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getGroups, createGroup, getGroup, updateGroup, deleteGroup };
