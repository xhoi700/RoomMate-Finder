const express = require('express');
const app = express();
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());  // Middleware to parse JSON request body
app.use('/api/users', userRoutes);  // Use the userRoutes for `/api/users` endpoint

sequelize.authenticate()
  .then(() => console.log('✅ Database connected.'))
  .catch((err) => console.error('❌ Database error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
