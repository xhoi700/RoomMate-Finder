const User = require("../../models/user");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ message: "All users", data: users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const data = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };

    const result = await User.create(data);
    res.json({ message: "User created", data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsersById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User found", data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser, getUsers, getUsersById };
