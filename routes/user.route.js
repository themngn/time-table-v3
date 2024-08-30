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
    getAllPossibleChoices,
} = require("../controllers/user.controller");

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id/timetable", getTimetable);
router.get("/:id/choices", getAllPossibleChoices);

module.exports = router;
