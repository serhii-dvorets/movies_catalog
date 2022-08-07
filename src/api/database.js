const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('movies_db', 'user', 'pass', {
  dialect: 'sqlite',
  host: './dev.sqlite'
})

module.exports = sequelize;
