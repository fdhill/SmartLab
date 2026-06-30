const authService = require('../services/authService');
const userRepository = require('../repositories/userRepository');

async function login(req, res, next) {
  try {
    const { token, user } = await authService.login(req.body);
    res.json({
      success: true,
      message: 'Login successful',
      data: { token, user },
    });
  } catch (err) {
    next(err);
  }
}

async function me(req, res, next) {
  try {
    const user = await userRepository.findById(req.user.sub);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: user.toJSON() });
  } catch (err) {
    next(err);
  }
}

module.exports = { login, me };
