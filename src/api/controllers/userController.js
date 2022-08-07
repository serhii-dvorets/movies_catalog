const ApiError = require('../exeptions/apiError');
const userService = require('../service/userService');

class UserController {
  async registration(req, res, next) {
    try {
      const { email, name, password, confirmPassword } = req.body;
      if (password !== confirmPassword) {
        throw ApiError.BadRequest('Passwords are not equal');
      }
      const userData = await userService.registration(email, name, password);
      return res.json(userData);
    } catch (e) {
      next(e)
    }

  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      return res.json(userData);
    } catch (e) {
      next(e)
      console.log('USER CONTROLLER LOGIN ERROR ', e);
    }

  }
}

module.exports = new UserController();