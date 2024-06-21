const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { body } = require('express-validator');
const { handleValidationErrors, asyncHandler } = require('../middlewares/middleware');

const registerValidationRules = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

// Register a new user
const register = asyncHandler(async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).send(user);
});

const loginValidationRules = [
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').notEmpty().withMessage('Password is required')
];

// Login user
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new Error('User not found');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ id: user._id }, JWT_SECRET);
  res.status(200).send({ user, token });
});

// Get all users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(users);
});

// Create a new user
const createUser = asyncHandler(async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json({ message: "User created" });
});

// Get a single user
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Update a user by id
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
  res.status(200).json({ message: "User updated", user });
});

// Delete a user by id
const deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "User deleted" });
});

module.exports = {
  register: [registerValidationRules, handleValidationErrors, register],
  login: [loginValidationRules, handleValidationErrors, login],
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
};
