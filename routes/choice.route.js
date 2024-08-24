const express = require("express");
const Choice = require("../models/choice.model");
const router = express.Router();
const {
    getChoices,
    createChoice,
    getChoice,
    updateChoice,
    deleteChoice,
    getSubgroups,
} = require("../controllers/choice.controller");

router.get("/", getChoices);
router.post("/", createChoice);
router.get("/:id", getChoice);
router.put("/:id", updateChoice);
router.delete("/:id", deleteChoice);
router.get("/:id/subgroups", getSubgroups);

module.exports = router;
