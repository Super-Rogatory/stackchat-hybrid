const Sequelize = require('sequelize');
const db = new Sequelize('postgres://super-rogatory@localhost:5432/stackchat', {
    logging: false
});

module.exports = db;

