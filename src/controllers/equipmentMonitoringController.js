const equipmentMonitoringService = require('../services/equipmentMonitoringService');
const equipmentMonitoringRepository = require('../repositories/equipmentMonitoringRepository');
const equipmentRepository = require('../repositories/equipmentRepository');
const { ok, created, fail } = require('../utils/response');

async function index(req, res, next) {
  try {
    let records;
    if (req.user.role === 'admin') {
      const { equipment_id, assistant_id } = req.query;
      if (equipment_id) {
        records = await equipmentMonitoringService.getMonitoringByEquipment(Number(equipment_id));
      } else if (assistant_id) {
        records = await equipmentMonitoringService.getMonitoringByAssistant(Number(assistant_id));
      } else {
        records = await equipmentMonitoringService.getAllMonitoring();
      }
    } else {
      records = await equipmentMonitoringRepository.findByAssistantId(req.assistant.id);
    }
    ok(res, records, 'Equipment monitoring records retrieved successfully');
  } catch (err) {
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const record = await equipmentMonitoringService.getMonitoringById(Number(req.params.id));
    if (req.user.role === 'assistant' && record.assistant_id !== req.assistant.id) {
      return fail(res, 'Access denied to this monitoring record', 403);
    }
    ok(res, record, 'Equipment monitoring record retrieved successfully');
  } catch (err) {
    next(err);
  }
}

async function store(req, res, next) {
  try {
    let data = { ...req.body };

    if (req.user.role === 'assistant') {
      data.assistant_id = req.assistant.id;
      const equipment = await equipmentRepository.findById(Number(data.equipment_id));
      if (!equipment) {
        return fail(res, 'Equipment not found', 404);
      }
      if (!req.assignedLabIds.includes(equipment.lab_id)) {
        return fail(res, 'Equipment is not in your assigned lab', 403);
      }
    }

    const record = await equipmentMonitoringService.createMonitoring(data);
    created(res, record, 'Equipment monitoring record created successfully');
  } catch (err) {
    next(err);
  }
}

async function destroy(req, res, next) {
  try {
    await equipmentMonitoringService.deleteMonitoring(Number(req.params.id));
    ok(res, null, 'Equipment monitoring record deleted successfully');
  } catch (err) {
    next(err);
  }
}

module.exports = { index, show, store, destroy };
