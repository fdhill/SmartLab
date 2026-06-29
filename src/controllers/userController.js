const userService = require('../services/userService');

async function index(req, res, next) {
  try {
    const users = await userService.getAllUsers();
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const user = await userService.getUserById(Number(req.params.id));
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

async function store(req, res, next) {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

module.exports = { index, show, store };
