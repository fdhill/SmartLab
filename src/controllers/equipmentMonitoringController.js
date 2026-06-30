const equipmentMonitoringService = require('../services/equipmentMonitoringService');

async function index(req, res, next) {
  try {
    const { equipment_id, assistant_id } = req.query;
    let records;
    if (equipment_id) {
      records = await equipmentMonitoringService.getMonitoringByEquipment(Number(equipment_id));
    } else if (assistant_id) {
      records = await equipmentMonitoringService.getMonitoringByAssistant(Number(assistant_id));
    } else {
      records = await equipmentMonitoringService.getAllMonitoring();
    }
    res.json({ success: true, data: records });
  } catch (err) {
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const record = await equipmentMonitoringService.getMonitoringById(Number(req.params.id));
    res.json({ success: true, data: record });
  } catch (err) {
    next(err);
  }
}

async function store(req, res, next) {
  try {
    const record = await equipmentMonitoringService.createMonitoring(req.body);
    res.status(201).json({ success: true, data: record });
  } catch (err) {
    next(err);
  }
}

async function destroy(req, res, next) {
  try {
    await equipmentMonitoringService.deleteMonitoring(Number(req.params.id));
    res.json({ success: true, message: 'Equipment monitoring record deleted successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = { index, show, store, destroy };
