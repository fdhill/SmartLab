const equipmentService = require('../services/equipmentService');
const equipmentRepository = require('../repositories/equipmentRepository');
const { ok, created, fail } = require('../utils/response');

async function index(req, res, next) {
  try {
    let equipment;
    if (req.user.role === 'admin') {
      const { lab_id } = req.query;
      equipment = lab_id
        ? await equipmentService.getEquipmentByLab(Number(lab_id))
        : await equipmentService.getAllEquipment();
    } else {
      equipment = await equipmentRepository.findByLabIds(req.assignedLabIds);
    }
    ok(res, equipment, 'Equipment retrieved successfully');
  } catch (err) {
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const equipment = await equipmentService.getEquipmentById(Number(req.params.id));
    if (req.user.role === 'assistant' && !req.assignedLabIds.includes(equipment.lab_id)) {
      return fail(res, 'Access denied to this equipment', 403);
    }
    ok(res, equipment, 'Equipment retrieved successfully');
  } catch (err) {
    next(err);
  }
}

async function store(req, res, next) {
  try {
    const equipment = await equipmentService.createEquipment(req.body);
    created(res, equipment, 'Equipment created successfully');
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const equipment = await equipmentService.updateEquipment(Number(req.params.id), req.body);
    ok(res, equipment, 'Equipment updated successfully');
  } catch (err) {
    next(err);
  }
}

async function destroy(req, res, next) {
  try {
    await equipmentService.deleteEquipment(Number(req.params.id));
    ok(res, null, 'Equipment deleted successfully');
  } catch (err) {
    next(err);
  }
}

module.exports = { index, show, store, update, destroy };
