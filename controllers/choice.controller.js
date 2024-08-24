const Choice = require("../models/choice.model");

const getChoices = async (req, res) => {
    try {
        const choices = await Choice.find({});
        res.status(200).json(choices);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createChoice = async (req, res) => {
    try {
        const choice = await Choice.create(req.body);
        res.status(201).json(choice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getChoice = async (req, res) => {
    try {
        const choice = await Choice.findById(req.params.id);
        if (!choice) {
            return res.status(404).json({ message: "Choice not found" });
        }
        res.status(200).json(choice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateChoice = async (req, res) => {
    try {
        const { id } = req.params;
        const choice = await Choice.findByIdAndUpdate(id, req.body);
        if (!choice) {
            return res.status(404).json({ message: "Choice not found" });
        }
        const updatedChoice = await Choice.findById(id);
        res.status(200).json(updatedChoice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteChoice = async (req, res) => {
    try {
        const { id } = req.params;
        const choice = await Choice.findByIdAndDelete(id);
        if (!choice) {
            return res.status(404).json({ message: "Choice not found" });
        }
        res.status(200).json({ message: "Choice deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSubgroups = async (req, res) => {
    try {
        const choice = await Choice.findById(req.params.id).populate(
            "subgroups"
        );
        if (!choice) {
            return res.status(404).json({ message: "Choice not found" });
        }
        res.status(200).json(choice.subgroups);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getChoices,
    createChoice,
    getChoice,
    updateChoice,
    deleteChoice,
    getSubgroups,
};
