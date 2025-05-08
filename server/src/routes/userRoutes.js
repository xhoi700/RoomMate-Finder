const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { createUser, getUsers, getUsersById } = require('../controller/userController'); // Correct path

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUsersById);

=======
const { User } = require('../models');  // Assuming you're using Sequelize for your User model

// Example GET route (you can keep it as is)
router.get('/', (req, res) => {
  res.send('User routes are working!');
});

// POST route to create a new user
router.post('/', async (req, res) => {
  const { firstName, lastName, password } = req.body;

  // Validate that required fields are present
  if (!firstName || !lastName || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Create a new user in the database using Sequelize
    const newUser = await User.create({ firstName, lastName, password });
    
    // Respond with the newly created user
    res.status(201).json(newUser);
  } catch (err) {
    // Handle any database errors
    res.status(500).json({ error: 'Error creating user' });
  }
});

>>>>>>> 384baa2feb8da9c65449e6a53f57861f6b63ce3c
module.exports = router;
