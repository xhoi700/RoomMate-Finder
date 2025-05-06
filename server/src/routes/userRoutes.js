const express = require("express");
const { getUsers, getUsersById } = require("../controller/userController");
const user_routes = express.Router();

user_routes.get("/get-all", getUsers);
user_routes.get("/:id", getUsersById);

module.exports = user_routes;
