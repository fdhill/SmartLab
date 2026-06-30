const assistantAssignmentRepository = require('../repositories/assistantAssignmentRepository');
const labAssistantRepository = require('../repositories/labAssistantRepository');
const labRepository = require('../repositories/labRepository');
const AssistantAssignment = require('../models/AssistantAssignment');

function assertFound(assignment, id) {
  if (!assignment) {
    const err = new Error(`Assistant assignment with id ${id} not found`);
    err.status = 404;
    throw err;
  }
}

async function getAllAssignments() {
  return assistantAssignmentRepository.findAll();
}

async function getAssignmentById(id) {
  const assignment = await assistantAssignmentRepository.findById(id);
  assertFound(assignment, id);
  return assignment;
}

async function getAssignmentsByAssistant(assistant_id) {
  const assistant = await labAssistantRepository.findById(assistant_id);
  if (!assistant) {
    const err = new Error(`Lab assistant with id ${assistant_id} not found`);
    err.status = 404;
    throw err;
  }
  return assistantAssignmentRepository.findByAssistantId(assistant_id);
}

async function getAssignmentsByLab(lab_id) {
  const lab = await labRepository.findById(lab_id);
  if (!lab) {
    const err = new Error(`Lab with id ${lab_id} not found`);
    err.status = 404;
    throw err;
  }
  return assistantAssignmentRepository.findByLabId(lab_id);
}

async function createAssignment({ assistant_id, lab_id, day, shift }) {
  if (!assistant_id || !lab_id || !day || !shift) {
    const err = new Error('assistant_id, lab_id, day, and shift are required');
    err.status = 400;
    throw err;
  }

  if (!Object.values(AssistantAssignment.DAY).includes(day)) {
    const err = new Error(`Invalid day. Must be one of: ${Object.values(AssistantAssignment.DAY).join(', ')}`);
    err.status = 400;
    throw err;
  }

  if (!Object.values(AssistantAssignment.SHIFT).includes(shift)) {
    const err = new Error(`Invalid shift. Must be one of: ${Object.values(AssistantAssignment.SHIFT).join(', ')}`);
    err.status = 400;
    throw err;
  }

  const [assistant, lab] = await Promise.all([
    labAssistantRepository.findById(assistant_id),
    labRepository.findById(lab_id),
  ]);

  if (!assistant) { const err = new Error(`Lab assistant with id ${assistant_id} not found`); err.status = 404; throw err; }
  if (!lab) { const err = new Error(`Lab with id ${lab_id} not found`); err.status = 404; throw err; }

  const existing = await assistantAssignmentRepository.findByAssistantId(assistant_id);
  const conflict = existing.find((a) => a.lab_id === Number(lab_id) && a.day === day && a.shift === shift);
  if (conflict) {
    const err = new Error('This assistant is already assigned to this lab on the same day and shift');
    err.status = 409;
    throw err;
  }

  return assistantAssignmentRepository.create({ assistant_id, lab_id, day, shift });
}

async function deleteAssignment(id) {
  const assignment = await assistantAssignmentRepository.findById(id);
  assertFound(assignment, id);
  return assistantAssignmentRepository.remove(id);
}

module.exports = { getAllAssignments, getAssignmentById, getAssignmentsByAssistant, getAssignmentsByLab, createAssignment, deleteAssignment };
