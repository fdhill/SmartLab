const labService = require('../services/labService');
const { ok, created } = require('../utils/response');

async function index(req, res, next) {
  try {
    const { status } = req.query;
    const labs = status
      ? await labService.getLabsByStatus(status)
      : await labService.getAllLabs();
    ok(res, labs, 'Labs retrieved successfully');
  } catch (err) {
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const lab = await labService.getLabById(Number(req.params.id));
    ok(res, lab, 'Lab retrieved successfully');
  } catch (err) {
    next(err);
  }
}

async function store(req, res, next) {
  try {
    const lab = await labService.createLab(req.body);
    created(res, lab, 'Lab created successfully');
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const lab = await labService.updateLab(Number(req.params.id), req.body);
    ok(res, lab, 'Lab updated successfully');
  } catch (err) {
    next(err);
  }
}

async function destroy(req, res, next) {
  try {
    await labService.deleteLab(Number(req.params.id));
    ok(res, null, 'Lab deleted successfully');
  } catch (err) {
    next(err);
  }
}

module.exports = { index, show, store, update, destroy };
