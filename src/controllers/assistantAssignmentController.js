const assistantAssignmentService = require('../services/assistantAssignmentService');

async function index(req, res, next) {
  try {
    const { assistant_id, lab_id } = req.query;
    let assignments;
    if (assistant_id) {
      assignments = await assistantAssignmentService.getAssignmentsByAssistant(Number(assistant_id));
    } else if (lab_id) {
      assignments = await assistantAssignmentService.getAssignmentsByLab(Number(lab_id));
    } else {
      assignments = await assistantAssignmentService.getAllAssignments();
    }
    res.json({ success: true, data: assignments });
  } catch (err) {
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const assignment = await assistantAssignmentService.getAssignmentById(Number(req.params.id));
    res.json({ success: true, data: assignment });
  } catch (err) {
    next(err);
  }
}

async function store(req, res, next) {
  try {
    const assignment = await assistantAssignmentService.createAssignment(req.body);
    res.status(201).json({ success: true, data: assignment });
  } catch (err) {
    next(err);
  }
}

async function destroy(req, res, next) {
  try {
    await assistantAssignmentService.deleteAssignment(Number(req.params.id));
    res.json({ success: true, message: 'Assistant assignment deleted successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = { index, show, store, destroy };
