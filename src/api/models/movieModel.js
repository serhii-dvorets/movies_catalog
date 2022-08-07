const { STRING } = require('sequelize');
const {
  Model,
  DataTypes,
} = require('sequelize');

const sequelize = require('../database');

class MovieModel extends Model {}

MovieModel.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  year: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  format: {
    type: DataTypes.STRING
  },
  actors: {
    type: DataTypes.RANGE(DataTypes.STRING)
    // type: DataTypes.STRING
  }
}, {
  sequelize,
  timestamps: false,
  modelName: 'movie'
})

module.exports = MovieModel;
