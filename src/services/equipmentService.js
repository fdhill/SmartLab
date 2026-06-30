const equipmentRepository = require('../repositories/equipmentRepository');
const labRepository = require('../repositories/labRepository');
const Equipment = require('../models/Equipment');

function assertFound(equipment, id) {
  if (!equipment) {
    const err = new Error(`Equipment with id ${id} not found`);
    err.status = 404;
    throw err;
  }
}

async function getAllEquipment() {
  return equipmentRepository.findAll();
}

async function getEquipmentById(id) {
  const equipment = await equipmentRepository.findById(id);
  assertFound(equipment, id);
  return equipment;
}

async function getEquipmentByLab(lab_id) {
  const lab = await labRepository.findById(lab_id);
  if (!lab) {
    const err = new Error(`Lab with id ${lab_id} not found`);
    err.status = 404;
    throw err;
  }
  return equipmentRepository.findByLabId(lab_id);
}

async function createEquipment({ lab_id, name, code, quantity, condition }) {
  if (!lab_id || !name || !code) {
    const err = new Error('lab_id, name, and code are required');
    err.status = 400;
    throw err;
  }

  if (condition && !Object.values(Equipment.CONDITION).includes(condition)) {
    const err = new Error(`Invalid condition. Must be one of: ${Object.values(Equipment.CONDITION).join(', ')}`);
    err.status = 400;
    throw err;
  }

  const lab = await labRepository.findById(lab_id);
  if (!lab) {
    const err = new Error(`Lab with id ${lab_id} not found`);
    err.status = 404;
    throw err;
  }

  const existing = await equipmentRepository.findByCode(code);
  if (existing) {
    const err = new Error(`Equipment with code "${code}" already exists`);
    err.status = 409;
    throw err;
  }

  return equipmentRepository.create({ lab_id, name, code, quantity, condition });
}

async function updateEquipment(id, { lab_id, name, code, quantity, condition }) {
  const equipment = await equipmentRepository.findById(id);
  assertFound(equipment, id);

  if (condition && !Object.values(Equipment.CONDITION).includes(condition)) {
    const err = new Error(`Invalid condition. Must be one of: ${Object.values(Equipment.CONDITION).join(', ')}`);
    err.status = 400;
    throw err;
  }

  if (code && code !== equipment.code) {
    const existing = await equipmentRepository.findByCode(code);
    if (existing) {
      const err = new Error(`Equipment with code "${code}" already exists`);
      err.status = 409;
      throw err;
    }
  }

  return equipmentRepository.update(id, {
    lab_id: lab_id ?? equipment.lab_id,
    name: name ?? equipment.name,
    code: code ?? equipment.code,
    quantity: quantity ?? equipment.quantity,
    condition: condition ?? equipment.condition,
  });
}

async function deleteEquipment(id) {
  const equipment = await equipmentRepository.findById(id);
  assertFound(equipment, id);
  return equipmentRepository.remove(id);
}

module.exports = { getAllEquipment, getEquipmentById, getEquipmentByLab, createEquipment, updateEquipment, deleteEquipment };
