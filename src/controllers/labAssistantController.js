const labAssistantService = require('../services/labAssistantService');

async function index(req, res, next) {
  try {
    const assistants = await labAssistantService.getAllAssistants();
    res.json({ success: true, data: assistants });
  } catch (err) {
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const assistant = await labAssistantService.getAssistantById(Number(req.params.id));
    res.json({ success: true, data: assistant });
  } catch (err) {
    next(err);
  }
}

async function store(req, res, next) {
  try {
    const assistant = await labAssistantService.createAssistant(req.body);
    res.status(201).json({ success: true, data: assistant });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const assistant = await labAssistantService.updateAssistant(Number(req.params.id), req.body);
    res.json({ success: true, data: assistant });
  } catch (err) {
    next(err);
  }
}

async function destroy(req, res, next) {
  try {
    await labAssistantService.deleteAssistant(Number(req.params.id));
    res.json({ success: true, message: 'Lab assistant deleted successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = { index, show, store, update, destroy };
