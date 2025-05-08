<<<<<<< HEAD
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
=======
// src/controllers/userController.js
const { User } = require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { firstName, lastName, password } = req.body;

    if (!firstName || !lastName || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ firstName, lastName, password: hashedPassword });

    res.status(201).json({ message: 'User registered!', userId: newUser.id });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

const login = async (req, res) => {
  try {
    const { firstName, password } = req.body;

    const user = await User.findOne({ where: { firstName } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1d' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = { register, login };
>>>>>>> 384baa2feb8da9c65449e6a53f57861f6b63ce3c
