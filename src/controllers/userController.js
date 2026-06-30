const userService = require('../services/userService');
const { ok, created, fail } = require('../utils/response');

async function index(req, res, next) {
  try {
    const users = await userService.getAllUsers();
    ok(res, users, 'Users retrieved successfully');
  } catch (err) {
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const user = await userService.getUserById(Number(req.params.id));
    ok(res, user, 'User retrieved successfully');
  } catch (err) {
    next(err);
  }
}

async function store(req, res, next) {
  try {
    const user = await userService.createUser(req.body);
    created(res, user, 'User created successfully');
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const user = await userService.updateUser(Number(req.params.id), req.body);
    ok(res, user, 'User updated successfully');
  } catch (err) {
    next(err);
  }
}

async function destroy(req, res, next) {
  try {
    await userService.deleteUser(Number(req.params.id));
    ok(res, null, 'User deleted successfully');
  } catch (err) {
    next(err);
  }
}

module.exports = { index, show, store, update, destroy };
