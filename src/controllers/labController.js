const labService = require('../services/labService');

async function index(req, res, next) {
  try {
    const { status } = req.query;
    const labs = status
      ? await labService.getLabsByStatus(status)
      : await labService.getAllLabs();
    res.json({ success: true, data: labs });
  } catch (err) {
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const lab = await labService.getLabById(Number(req.params.id));
    res.json({ success: true, data: lab });
  } catch (err) {
    next(err);
  }
}

async function store(req, res, next) {
  try {
    const lab = await labService.createLab(req.body);
    res.status(201).json({ success: true, data: lab });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const lab = await labService.updateLab(Number(req.params.id), req.body);
    res.json({ success: true, data: lab });
  } catch (err) {
    next(err);
  }
}

async function destroy(req, res, next) {
  try {
    await labService.deleteLab(Number(req.params.id));
    res.json({ success: true, message: 'Lab deleted successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = { index, show, store, update, destroy };
