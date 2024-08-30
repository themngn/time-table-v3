const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    classes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Class",
    },
});

const Course = mongoose.model("Course", groupSchema);

module.exports = Course;
