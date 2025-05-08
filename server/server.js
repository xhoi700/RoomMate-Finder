<<<<<<< HEAD
// server.js
const express = require('express');
const app = express();
const sequelize = require('./config/database');

// Middleware
app.use(express.json());

// Routes
const userRoutes = require('./src/routes/userRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const matchRoutes = require('./src/routes/matchRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);  // Check here
app.use('/api/matches', matchRoutes);

// Sync models and start server
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected.');
    return sequelize.sync({ alter: true });  // Sync schema changes to the DB
  })
  .then(() => console.log('🛠️ Tables synced.'))
=======
const express = require('express');
const app = express();
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());  // Middleware to parse JSON request body
app.use('/api/users', userRoutes);  // Use the userRoutes for `/api/users` endpoint

sequelize.authenticate()
  .then(() => console.log('✅ Database connected.'))
>>>>>>> 384baa2feb8da9c65449e6a53f57861f6b63ce3c
  .catch((err) => console.error('❌ Database error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
