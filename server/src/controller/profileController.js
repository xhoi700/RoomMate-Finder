// controller/profileController.js
const Profile = require("../../models/profile");

const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.findAll();
    res.json({ message: "All profiles", data: profiles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProfile = async (req, res) => {
  try {
    const { location, budget, isGirl, isStudent, contactEmail, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const data = {
      location,
      budget,
      isGirl,
      isStudent,
      contactEmail,
      userId
    };

    const newProfile = await Profile.create(data);
    res.status(201).json({ message: "Profile created", data: newProfile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProfiles, createProfile };
