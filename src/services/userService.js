const userRepository = require('../repositories/userRepository');
const User = require('../models/User');

function assertFound(user, id) {
  if (!user) {
    const err = new Error(`User with id ${id} not found`);
    err.status = 404;
    throw err;
  }
}

async function getAllUsers() {
  return userRepository.findAll();
}

async function getUserById(id) {
  const user = await userRepository.findById(id);
  assertFound(user, id);
  return user;
}

async function createUser({ name, email, password, role, phone_number }) {
  if (!name || !email || !password || !role) {
    const err = new Error('name, email, password, and role are required');
    err.status = 400;
    throw err;
  }

  if (!Object.values(User.ROLE).includes(role)) {
    const err = new Error(`Invalid role. Must be one of: ${Object.values(User.ROLE).join(', ')}`);
    err.status = 400;
    throw err;
  }

  const existing = await userRepository.findByEmail(email);
  if (existing) {
    const err = new Error('Email is already in use');
    err.status = 409;
    throw err;
  }

  return userRepository.create({ name, email, password, role, phone_number });
}

async function updateUser(id, { name, email, password, role, phone_number }) {
  const user = await userRepository.findById(id);
  assertFound(user, id);

  if (role && !Object.values(User.ROLE).includes(role)) {
    const err = new Error(`Invalid role. Must be one of: ${Object.values(User.ROLE).join(', ')}`);
    err.status = 400;
    throw err;
  }

  if (email && email !== user.email) {
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      const err = new Error('Email is already in use');
      err.status = 409;
      throw err;
    }
  }

  return userRepository.update(id, {
    name: name ?? user.name,
    email: email ?? user.email,
    password: password ?? user.password,
    role: role ?? user.role,
    phone_number: phone_number ?? user.phone_number,
  });
}

async function deleteUser(id) {
  const user = await userRepository.findById(id);
  assertFound(user, id);
  return userRepository.remove(id);
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
