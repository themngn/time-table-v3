const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
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
    link: {
        type: String,
    },
    teacher: {
        type: String,
    },
    video_link: {
        type: String,
    },
    room: {
        type: String,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: false,
    },
});

const Class = mongoose.model("Class", groupSchema);

module.exports = Class;
