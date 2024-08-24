const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    subgroups: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Group",
    },
});

const Choice = mongoose.model("Choice", groupSchema);

module.exports = Choice;
