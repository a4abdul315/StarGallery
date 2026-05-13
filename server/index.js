const app = require('./app');
const sequelize = require('./config/database');

const PORT = process.env.PORT || 5000;

// Sync Database and Start Server
async function startServer() {
  try {
    // Authenticate connection
    await sequelize.authenticate();
    console.log('PostgreSQL Connected...');

    // Sync models (creates tables if they don't exist)
    // In production, use migrations instead of { alter: true }
    await sequelize.sync({ alter: true });
    console.log('Database synced');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();
