const labAssistantService = require('../services/labAssistantService');
const { ok, created } = require('../utils/response');

async function index(req, res, next) {
  try {
    const assistants = await labAssistantService.getAllAssistants();
    ok(res, assistants, 'Lab assistants retrieved successfully');
  } catch (err) {
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const assistant = await labAssistantService.getAssistantById(Number(req.params.id));
    ok(res, assistant, 'Lab assistant retrieved successfully');
  } catch (err) {
    next(err);
  }
}

async function store(req, res, next) {
  try {
    const assistant = await labAssistantService.createAssistant(req.body);
    created(res, assistant, 'Lab assistant created successfully');
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const assistant = await labAssistantService.updateAssistant(Number(req.params.id), req.body);
    ok(res, assistant, 'Lab assistant updated successfully');
  } catch (err) {
    next(err);
  }
}

async function destroy(req, res, next) {
  try {
    await labAssistantService.deleteAssistant(Number(req.params.id));
    ok(res, null, 'Lab assistant deleted successfully');
  } catch (err) {
    next(err);
  }
}

module.exports = { index, show, store, update, destroy };
