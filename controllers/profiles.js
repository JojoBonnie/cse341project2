const Profile = require("../models/Profile");

// Get all Profile for API
const getAllProfiles = async (req, res) => {
  //#swagger.tags = ['Profiles']
  try {
    const result = await Profile.find().populate('user');
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: `Failed to retrieve profiles: ${error}` });
  }
};

// Get a single Profile for API
const getProfile = async (req, res) => {
  //#swagger.tags = ['Profiles']
  try {
    const result = await Profile.findById(req.params.id);
    if (result) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Profile not found in result" });
    }
  } catch (error) {
    res.status(500).json({ message: `Failed to retrieve profile: ${error}` });
  }
};

// create a new profile
const createProfile = async (req, res) => {
  //#swagger.tags = ['Profiles']
  try {
    const profile = new Profile(req.body);
    await profile.save();
    res.status(201).json({ message: "Profile created" });
  } catch (error) {
    res.status(500).json({ message: `Failed to create profile: ${error}` });
  }
};

// update a profile by id
const updateProfile = async (req, res) => {
  //#swagger.tags = ['Profiles']
  try {
    const profile = await Profile.findByIdAndUpdate(req.params.id, req.body);
    await profile.save();
    res.status(200).json({ message: "Profile updated" });
  } catch (error) {
    res.status(500).json({ message: `Failed to update profile: ${error}` });
  }
};

// delete a profile by id
const deleteProfile = async (req, res) => {
  //#swagger.tags = ['Profiles']
  try {
    await Profile.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Profile deleted" });
  } catch (error) {
    res.status(500).json({ message: `Failed to delete profile: ${error}` });
  }
};

// export the controllers
module.exports = {
  getAllProfiles,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
};
