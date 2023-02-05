require('dotenv').config();

const Sequelize = require('sequelize');

// WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
// THEN I am able to connect to a database using Sequelize
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
