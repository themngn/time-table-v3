const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    subchoices: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Choice",
    },
    courses: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Course",
    },
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
