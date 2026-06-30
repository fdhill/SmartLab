const equipmentService = require('../services/equipmentService');

async function index(req, res, next) {
  try {
    const { lab_id } = req.query;
    const equipment = lab_id
      ? await equipmentService.getEquipmentByLab(Number(lab_id))
      : await equipmentService.getAllEquipment();
    res.json({ success: true, data: equipment });
  } catch (err) {
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const equipment = await equipmentService.getEquipmentById(Number(req.params.id));
    res.json({ success: true, data: equipment });
  } catch (err) {
    next(err);
  }
}

async function store(req, res, next) {
  try {
    const equipment = await equipmentService.createEquipment(req.body);
    res.status(201).json({ success: true, data: equipment });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const equipment = await equipmentService.updateEquipment(Number(req.params.id), req.body);
    res.json({ success: true, data: equipment });
  } catch (err) {
    next(err);
  }
}

async function destroy(req, res, next) {
  try {
    await equipmentService.deleteEquipment(Number(req.params.id));
    res.json({ success: true, message: 'Equipment deleted successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = { index, show, store, update, destroy };
