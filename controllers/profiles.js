const Profile = require("../models/Profile");
const { body } = require('express-validator');
const { handleValidationErrors, asyncHandler } = require('../middlewares/middleware');

// Validation rules for creating and updating profiles
const profileValidationRules = [
  body('user').isMongoId().withMessage('Invalid user ID'),
  body('bio').optional().isString().withMessage('Bio must be a string'),
  body('profilePic').optional().isURL().withMessage('Profile picture must be a valid URL'),
  body('interests').optional().isArray().withMessage('Interests must be an array of strings'),
  body('dateOfBirth').optional().isISO8601().withMessage('Date of birth must be a valid date'),
  body('gender').optional().isString().withMessage('Gender must be a string'),
  body('occupation').optional().isString().withMessage('Occupation must be a string'),
  body('location.city').optional().isString().withMessage('City must be a string'),
  body('location.state').optional().isString().withMessage('State must be a string'),
  body('location.country').optional().isString().withMessage('Country must be a string'),
  body('social.facebook').optional().isURL().withMessage('Facebook must be a valid URL'),
  body('social.twitter').optional().isURL().withMessage('Twitter must be a valid URL'),
  body('social.linkedin').optional().isURL().withMessage('LinkedIn must be a valid URL'),
  body('social.instagram').optional().isURL().withMessage('Instagram must be a valid URL'),
];

// Get all Profiles
const getAllProfiles = asyncHandler(async (req, res) => {
  const result = await Profile.find().populate({
    path: 'user',
    select: 'firstName lastName email'
  });
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(result);
});

// Get a single Profile
const getProfile = asyncHandler(async (req, res) => {
  const result = await Profile.findById(req.params.id).populate({
    path: 'user',
    select: 'firstName lastName email'
  });
  if (result) {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } else {
    res.status(404).json({ message: "Profile not found" });
  }
});

// Create a new Profile
const createProfile = [
  profileValidationRules,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const profile = new Profile(req.body);
    await profile.save();
    res.status(201).json({ message: "Profile created" });
  })
];

// Update a Profile by ID
const updateProfile = [
  profileValidationRules,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (profile) {
      res.status(200).json({ message: "Profile updated" });
    } else {
      res.status(404).json({ message: "Profile not found" });
    }
  })
];

// Delete a Profile by ID
const deleteProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findByIdAndDelete(req.params.id);
  if (profile) {
    res.status(200).json({ message: "Profile deleted" });
  } else {
    res.status(404).json({ message: "Profile not found" });
  }
});

module.exports = {
  getAllProfiles,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
};
