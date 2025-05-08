const express = require('express');
const app = express();
const sequelize = require('./config/database');

// Middleware
app.use(express.json());

// Corrected route paths
const userRoutes = require('./src/routes/userRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const matchRoutes = require('./src/routes/matchRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/matches', matchRoutes);

// DB and server startup
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected.');
    return sequelize.sync({ alter: true });
  })
  .then(() => console.log('🛠️ Tables synced.'))
  .catch((err) => console.error('❌ Database error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
