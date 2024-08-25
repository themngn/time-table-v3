const express = require("express");
const Group = require("../models/group.model");
const router = express.Router();
const {
    getGroups,
    createGroup,
    getGroup,
    updateGroup,
    deleteGroup,
    getTimetable,
} = require("../controllers/group.controller");

router.get("/", getGroups);
router.post("/", createGroup);
router.get("/:id", getGroup);
router.put("/:id", updateGroup);
router.delete("/:id", deleteGroup);
router.get("/:id/timetable", getTimetable);

module.exports = router;
