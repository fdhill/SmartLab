const labRepository = require('../repositories/labRepository');
const Lab = require('../models/Lab');

function assertFound(lab, id) {
  if (!lab) {
    const err = new Error(`Lab with id ${id} not found`);
    err.status = 404;
    throw err;
  }
}

async function getAllLabs() {
  return labRepository.findAll();
}

async function getLabById(id) {
  const lab = await labRepository.findById(id);
  assertFound(lab, id);
  return lab;
}

async function getLabsByStatus(status) {
  if (!Object.values(Lab.STATUS).includes(status)) {
    const err = new Error(`Invalid status. Must be one of: ${Object.values(Lab.STATUS).join(', ')}`);
    err.status = 400;
    throw err;
  }
  return labRepository.findByStatus(status);
}

async function createLab({ name, location, capacity, status }) {
  if (!name || !location || !capacity) {
    const err = new Error('name, location, and capacity are required');
    err.status = 400;
    throw err;
  }

  if (status && !Object.values(Lab.STATUS).includes(status)) {
    const err = new Error(`Invalid status. Must be one of: ${Object.values(Lab.STATUS).join(', ')}`);
    err.status = 400;
    throw err;
  }

  return labRepository.create({ name, location, capacity, status });
}

async function updateLab(id, { name, location, capacity, status }) {
  const lab = await labRepository.findById(id);
  assertFound(lab, id);

  if (status && !Object.values(Lab.STATUS).includes(status)) {
    const err = new Error(`Invalid status. Must be one of: ${Object.values(Lab.STATUS).join(', ')}`);
    err.status = 400;
    throw err;
  }

  return labRepository.update(id, {
    name: name ?? lab.name,
    location: location ?? lab.location,
    capacity: capacity ?? lab.capacity,
    status: status ?? lab.status,
  });
}

async function deleteLab(id) {
  const lab = await labRepository.findById(id);
  assertFound(lab, id);
  return labRepository.remove(id);
}

module.exports = { getAllLabs, getLabById, getLabsByStatus, createLab, updateLab, deleteLab };
