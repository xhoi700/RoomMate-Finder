// src/routes/matchRoutes.js
import express from 'express';
import {
  createMatch,
  getMatches,
} from '../controllers/matchController.js';

const router = express.Router();

/**
 * @route   POST /api/matches
 * @desc    Create a match request based on common profile features
 * @access  Protected
 */
router.post('/', createMatch);

/**
 * @route   GET /api/matches
 * @desc    Get all matches for the current user
 * @access  Protected
 */
router.get('/', getMatches);

export default router;
