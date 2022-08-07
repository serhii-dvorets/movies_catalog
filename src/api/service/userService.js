const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const tokenService = require('../service/tokenService');
const UserDto = require('../dtos/userDto');
const ApiError = require('../exeptions/apiError');

class UserService {
  async registration(email, name, password) {
    const userExists = await UserModel.findOne({ where: { email } })
    if (userExists) {
      throw ApiError.BadRequest(`email ${email} is already used`)
    }
    const hashPassword = await bcrypt.hash(password, 5);

    const user = await UserModel.create({
      email,
      name,
      password: hashPassword,
      confirmPassword: hashPassword,
    })

    const userDto = new UserDto(user);

    return { user: userDto }
  }

  async login(email, password) {
    const user = await UserModel.findOne({ where: { email } })
    if (!user) {
      throw new Error('User doesn\'t exist')
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      throw new Error('Password is not correct')
    }
    const userDto = new UserDto(user);
    const token = tokenService.generateToken({ ...userDto });

    return { token, user: userDto }
  }

}

module.exports = new UserService();