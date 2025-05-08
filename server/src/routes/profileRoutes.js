// routes/profileRoutes.js
const express = require("express");
const router = express.Router();
const { getProfiles, createProfile } = require("../controller/profileController");  // Corrected path

// Define routes
router.get("/", getProfiles);
router.post("/", createProfile);

module.exports = router;
