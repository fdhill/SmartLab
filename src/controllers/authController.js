const authService = require('../services/authService');
const userRepository = require('../repositories/userRepository');
const { ok, fail } = require('../utils/response');

async function login(req, res, next) {
  try {
    const { token, user } = await authService.login(req.body);
    ok(res, { token, user }, 'Login successful');
  } catch (err) {
    next(err);
  }
}

async function me(req, res, next) {
  try {
    const user = await userRepository.findById(req.user.sub);
    if (!user) return fail(res, 'User not found', 404);
    ok(res, user.toJSON(), 'Profile retrieved successfully');
  } catch (err) {
    next(err);
  }
}

module.exports = { login, me };
