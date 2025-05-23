import { User } from "../models/index.js"; // <-- our instantiated model

/**
 * Register a new user
 */
export async function register(req, res) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      gender,
      city,
      address,
      budget,
      role,
      homePet,
      description,
    } = req.body;
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      gender,
      city,
      address,
      budget,
      role,
      homePet,
      description,
    });
    return res.status(201).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(400).json({ message: error.message });
  }
}

/**
 * Authenticate a user
 */
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    // include password field explicitly for validation
    const user = await User.findOne({
      where: { email },
      attributes: { include: ["password"] },
    });
    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    return res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: error.message });
  }
}

/**
 * Get current user profile
 */
export async function getProfile(req, res) {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    console.error("Get Profile Error:", error);
    return res.status(500).json({ message: error.message });
  }
}

/**
 * Update current user profile
 */
export async function updateProfile(req, res) {
  try {
    const { firstName, lastName, password } = req.body;
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (password) user.password = password; // hashed by hook
    await user.save();
    return res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(400).json({ message: error.message });
  }
}

// at the bottom of src/controllers/userController.js
/**
 * Delete current user profile
 */
export async function deleteProfile(req, res) {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete Profile Error:", error);
    return res.status(500).json({ message: error.message });
  }
}

/**
 * Find matching users based on similar features
 */
export async function findMatches(req, res) {
  try {
    const currentUser = await User.findByPk(req.userId);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const matches = await User.findAll({
      where: {
        id: { not: currentUser.id },
        gender: currentUser.gender,
        city: currentUser.city,
        role: currentUser.role,
        homePet: currentUser.homePet,
      },
      attributes: { exclude: ["password"] },
    });

    return res.json(matches);
  } catch (error) {
    console.error("Find Matches Error:", error);
    return res.status(500).json({ message: error.message });
  }
}
