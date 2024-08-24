const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    day_of_week: {
        type: String,
        required: true,
    },
    biweekly: {
        type: Boolean,
        required: true,
    },
    biweekly_week: {
        type: Boolean,
        required: false,
    },
    start_time: {
        type: String,
        required: true,
    },
    end_time: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
});

const Class = mongoose.model("Class", groupSchema);

module.exports = Class;
