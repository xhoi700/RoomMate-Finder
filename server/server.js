import express from "express";
import sequelize from "./config/database.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import userRoutes from "./src/routes/userRoutes.js";
// import matchRoutes from './src/routes/matchRoutes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "Origin",
      "X-Requested-With",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
// app.use('/api/matches', matchRoutes);

// DB & server startup
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected.");
    return sequelize.sync({ alter: true });
  })
  .then(() => console.log("🛠️ Tables synced."))
  .catch((err) => console.error("❌ Database error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
