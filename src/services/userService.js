const userRepository = require('../repositories/userRepository');

async function getAllUsers() {
  return userRepository.findAll();
}

async function getUserById(id) {
  const user = await userRepository.findById(id);
  if (!user) {
    const err = new Error(`User with id ${id} not found`);
    err.status = 404;
    throw err;
  }
  return user;
}

async function createUser(data) {
  if (!data.name || !data.email) {
    const err = new Error('name and email are required');
    err.status = 400;
    throw err;
  }
  return userRepository.create(data);
}

module.exports = { getAllUsers, getUserById, createUser };
