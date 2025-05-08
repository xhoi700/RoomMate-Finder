import express from "express";
import {
  register,
  login,
  getProfile,
  updateProfile,
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

export default router;
