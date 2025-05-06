const getUsers = (req, res) => {
  console.log("sara----");
  res.json({ message: "Get all users" });
};

const getUsersById = (req, res) => {
  const userId = req.params.id;
  res.json({ message: "user by id", id: userId });
};

module.exports = { getUsers, getUsersById };