// src/controllers/matchController.js
import { Match, User } from "../models/index.js";
import { Op } from "sequelize";

// Create a match between two users based on common criteria
export async function createMatch(req, res) {
  try {
    const { userId } = req.user; // Assumes the userId is available in req.user
    const { city, gender, budget } = req.body;

    // Find users with matching features (same city, budget, and gender)
    const matchedUsers = await User.findAll({
      where: {
        id: { [Op.ne]: userId }, // Ensure not matching the same user
        city,
        gender,
        budget: { [Op.gte]: budget - 100, [Op.lte]: budget + 100 }, // Match users within a budget range
      },
    });

    if (matchedUsers.length === 0) {
      return res.status(404).json({ message: "No matches found." });
    }

    // Create match entries for all matched users
    const matches = await Promise.all(
      matchedUsers.map((matchedUser) =>
        Match.create({
          requesterId: userId,
          recipientId: matchedUser.id,
          status: 'pending',
        })
      )
    );

    return res.status(201).json(matches);
  } catch (error) {
    console.error("Create Match Error:", error);
    return res.status(500).json({ message: error.message });
  }
}

// Get all matches for the current user
export async function getMatches(req, res) {
  try {
    const { userId } = req.user; // Assumes the userId is available in req.user

    const matches = await Match.findAll({
      where: {
        [Op.or]: [{ requesterId: userId }, { recipientId: userId }],
      },
      include: [
        {
          model: User,
          as: "requester",
          attributes: ["id", "firstName", "lastName", "city", "gender", "budget"],
        },
        {
          model: User,
          as: "recipient",
          attributes: ["id", "firstName", "lastName", "city", "gender", "budget"],
        },
      ],
    });

    return res.json(matches);
  } catch (error) {
    console.error("Get Matches Error:", error);
    return res.status(500).json({ message: error.message });
  }
}
