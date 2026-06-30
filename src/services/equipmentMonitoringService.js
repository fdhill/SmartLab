const equipmentMonitoringRepository = require('../repositories/equipmentMonitoringRepository');
const equipmentRepository = require('../repositories/equipmentRepository');
const labAssistantRepository = require('../repositories/labAssistantRepository');
const EquipmentMonitoring = require('../models/EquipmentMonitoring');

function assertFound(record, id) {
  if (!record) {
    const err = new Error(`Equipment monitoring record with id ${id} not found`);
    err.status = 404;
    throw err;
  }
}

async function getAllMonitoring() {
  return equipmentMonitoringRepository.findAll();
}

async function getMonitoringById(id) {
  const record = await equipmentMonitoringRepository.findById(id);
  assertFound(record, id);
  return record;
}

async function getMonitoringByEquipment(equipment_id) {
  const equipment = await equipmentRepository.findById(equipment_id);
  if (!equipment) {
    const err = new Error(`Equipment with id ${equipment_id} not found`);
    err.status = 404;
    throw err;
  }
  return equipmentMonitoringRepository.findByEquipmentId(equipment_id);
}

async function getMonitoringByAssistant(assistant_id) {
  const assistant = await labAssistantRepository.findById(assistant_id);
  if (!assistant) {
    const err = new Error(`Lab assistant with id ${assistant_id} not found`);
    err.status = 404;
    throw err;
  }
  return equipmentMonitoringRepository.findByAssistantId(assistant_id);
}

async function createMonitoring({ equipment_id, assistant_id, check_date, condition, notes }) {
  if (!equipment_id || !assistant_id || !check_date || !condition) {
    const err = new Error('equipment_id, assistant_id, check_date, and condition are required');
    err.status = 400;
    throw err;
  }

  if (!Object.values(EquipmentMonitoring.CONDITION).includes(condition)) {
    const err = new Error(`Invalid condition. Must be one of: ${Object.values(EquipmentMonitoring.CONDITION).join(', ')}`);
    err.status = 400;
    throw err;
  }

  const [equipment, assistant] = await Promise.all([
    equipmentRepository.findById(equipment_id),
    labAssistantRepository.findById(assistant_id),
  ]);

  if (!equipment) { const err = new Error(`Equipment with id ${equipment_id} not found`); err.status = 404; throw err; }
  if (!assistant) { const err = new Error(`Lab assistant with id ${assistant_id} not found`); err.status = 404; throw err; }

  return equipmentMonitoringRepository.create({ equipment_id, assistant_id, check_date, condition, notes });
}

async function deleteMonitoring(id) {
  const record = await equipmentMonitoringRepository.findById(id);
  assertFound(record, id);
  return equipmentMonitoringRepository.remove(id);
}

module.exports = { getAllMonitoring, getMonitoringById, getMonitoringByEquipment, getMonitoringByAssistant, createMonitoring, deleteMonitoring };
