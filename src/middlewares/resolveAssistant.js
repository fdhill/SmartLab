const labAssistantRepository = require('../repositories/labAssistantRepository');
const assistantAssignmentRepository = require('../repositories/assistantAssignmentRepository');

async function resolveAssistant(req, res, next) {
  if (req.user.role !== 'assistant') return next();

  const assistant = await labAssistantRepository.findByUserId(req.user.sub);
  if (!assistant) {
    return res.status(403).json({
      success: false,
      message: 'No assistant profile found for this account',
    });
  }

  const assignments = await assistantAssignmentRepository.findByAssistantId(assistant.id);

  req.assistant = assistant;
  req.assignedLabIds = assignments.map((a) => a.lab_id);
  next();
}

module.exports = { resolveAssistant };
