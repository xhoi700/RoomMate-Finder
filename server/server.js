const express = require("express");
const app = express();
const PORT = 3000;
const user_routes = require("./src/routes/userRoutes");

app.use("/api/users", user_routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
