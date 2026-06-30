const labAssistantRepository = require('../repositories/labAssistantRepository');
const assistantAssignmentRepository = require('../repositories/assistantAssignmentRepository');
const { fail } = require('../utils/response');

async function resolveAssistant(req, res, next) {
  if (req.user.role !== 'assistant') return next();

  const assistant = await labAssistantRepository.findByUserId(req.user.sub);
  if (!assistant) {
    return fail(res, 'No assistant profile found for this account', 403);
  }

  const assignments = await assistantAssignmentRepository.findByAssistantId(assistant.id);

  req.assistant = assistant;
  req.assignedLabIds = assignments.map((a) => a.lab_id);
  next();
}

module.exports = { resolveAssistant };
