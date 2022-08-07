const {
  Model,
  DataTypes,
} = require('sequelize');

const sequelize = require('../database');
class UserModel extends Model {}

UserModel.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING
  },
  confirmPassword: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  timestamps: false,
  modelName: 'user'
})

module.exports = UserModel;
