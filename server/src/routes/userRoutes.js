import express from "express";
import {
  register,
  login,
  getProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/userController.js";

const router = express.Router();

/**
 * @route   POST /api/users/register
 * @desc    Register new user
 * @access  Public
 */
router.post("/register", register);

/**
 * @route   POST /api/users/login
 * @desc    Authenticate user
 * @access  Public
 */
router.post("/login", login);

/**
 * @route   GET /api/users/profile
 * @desc    Get current user profile
 * @access  Public
 */
router.get("/profile", getProfile);

/**
 * @route   PUT /api/users/profile
 * @desc    Update current user profile
 * @access  Public
 */
router.put("/profile", updateProfile);


// ... your existing POST/GET/PUT routes ...

/**
 * @route   DELETE /api/users/profile
 * @desc    Delete current user profile
 * @access  Public (or protected once you add real auth)
 */
router.delete('/profile', deleteProfile);

export default router;


