const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/userRepository');
const { sign } = require('../config/jwt');

async function login({ email, password }) {
  if (!email || !password) {
    const err = new Error('email and password are required');
    err.status = 400;
    throw err;
  }

  const user = await userRepository.findByEmail(email);
  if (!user) {
    const err = new Error('Invalid email or password');
    err.status = 401;
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error('Invalid email or password');
    err.status = 401;
    throw err;
  }

  const payload = {
    sub: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const token = sign(payload);

  return { token, user: user.toJSON() };
}

module.exports = { login };
