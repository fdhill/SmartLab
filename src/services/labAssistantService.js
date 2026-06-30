const labAssistantRepository = require('../repositories/labAssistantRepository');
const userRepository = require('../repositories/userRepository');
const User = require('../models/User');

function assertFound(assistant, id) {
  if (!assistant) {
    const err = new Error(`Lab assistant with id ${id} not found`);
    err.status = 404;
    throw err;
  }
}

async function getAllAssistants() {
  return labAssistantRepository.findAll();
}

async function getAssistantById(id) {
  const assistant = await labAssistantRepository.findById(id);
  assertFound(assistant, id);
  return assistant;
}

async function createAssistant({ user_id, student_id, period }) {
  if (!user_id || !student_id || !period) {
    const err = new Error('user_id, student_id, and period are required');
    err.status = 400;
    throw err;
  }

  const user = await userRepository.findById(user_id);
  if (!user) {
    const err = new Error(`User with id ${user_id} not found`);
    err.status = 404;
    throw err;
  }

  if (user.role !== User.ROLE.ASSISTANT) {
    const err = new Error('The assigned user must have the "assistant" role');
    err.status = 400;
    throw err;
  }

  const existingByUser = await labAssistantRepository.findByUserId(user_id);
  if (existingByUser) {
    const err = new Error(`User with id ${user_id} is already registered as a lab assistant`);
    err.status = 409;
    throw err;
  }

  const existingByStudentId = await labAssistantRepository.findByStudentId(student_id);
  if (existingByStudentId) {
    const err = new Error(`Student ID "${student_id}" is already registered`);
    err.status = 409;
    throw err;
  }

  return labAssistantRepository.create({ user_id, student_id, period });
}

async function updateAssistant(id, { student_id, period }) {
  const assistant = await labAssistantRepository.findById(id);
  assertFound(assistant, id);

  if (student_id && student_id !== assistant.student_id) {
    const existing = await labAssistantRepository.findByStudentId(student_id);
    if (existing) {
      const err = new Error(`Student ID "${student_id}" is already registered`);
      err.status = 409;
      throw err;
    }
  }

  return labAssistantRepository.update(id, {
    student_id: student_id ?? assistant.student_id,
    period: period ?? assistant.period,
  });
}

async function deleteAssistant(id) {
  const assistant = await labAssistantRepository.findById(id);
  assertFound(assistant, id);
  return labAssistantRepository.remove(id);
}

module.exports = { getAllAssistants, getAssistantById, createAssistant, updateAssistant, deleteAssistant };
