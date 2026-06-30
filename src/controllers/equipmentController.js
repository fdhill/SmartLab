const equipmentService = require('../services/equipmentService');
const equipmentRepository = require('../repositories/equipmentRepository');

async function index(req, res, next) {
  try {
    let equipment;
    if (req.user.role === 'admin') {
      const { lab_id } = req.query;
      equipment = lab_id
        ? await equipmentService.getEquipmentByLab(Number(lab_id))
        : await equipmentService.getAllEquipment();
    } else {
      // asisten: hanya alat pada lab yang ditugaskan
      equipment = await equipmentRepository.findByLabIds(req.assignedLabIds);
    }
    res.json({ success: true, data: equipment });
  } catch (err) {
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const equipment = await equipmentService.getEquipmentById(Number(req.params.id));
    if (req.user.role === 'assistant' && !req.assignedLabIds.includes(equipment.lab_id)) {
      return res.status(403).json({ success: false, message: 'Access denied to this equipment' });
    }
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
