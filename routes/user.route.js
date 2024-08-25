const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getTimetable,
} = require("../controllers/user.controller");

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id/timetable", getTimetable);

module.exports = router;
