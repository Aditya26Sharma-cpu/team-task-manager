const express = require("express");

const Project = require("../models/project");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE PROJECT
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, description, teamMembers } = req.body;

    const project = await Project.create({
      name,
      description,
      teamMembers,
      createdBy: req.user.id,
    });

    res.status(201).json(project);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// GET ALL PROJECTS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("createdBy", "name email")
      .populate("teamMembers", "name email");

    res.json(projects);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;