const express = require("express");
const Class = require("../models/class.model");
const router = express.Router();
const {
    getClasses,
    createClass,
    getClass,
    updateClass,
    deleteClass,
} = require("../controllers/class.controller");

router.get("/", getClasses);
router.post("/", createClass);
router.get("/:id", getClass);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);

module.exports = router;
