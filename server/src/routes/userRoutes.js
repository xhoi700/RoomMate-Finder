const express = require('express');
const router = express.Router();
const { createUser, getUsers, getUsersById } = require('../controller/userController'); // Correct path

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUsersById);

module.exports = router;
