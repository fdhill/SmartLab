const equipmentMonitoringService = require('../services/equipmentMonitoringService');
const equipmentMonitoringRepository = require('../repositories/equipmentMonitoringRepository');
const equipmentRepository = require('../repositories/equipmentRepository');

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
      // asisten: hanya riwayat monitoring miliknya sendiri
      records = await equipmentMonitoringRepository.findByAssistantId(req.assistant.id);
    }
    res.json({ success: true, data: records });
  } catch (err) {
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const record = await equipmentMonitoringService.getMonitoringById(Number(req.params.id));
    if (req.user.role === 'assistant' && record.assistant_id !== req.assistant.id) {
      return res.status(403).json({ success: false, message: 'Access denied to this monitoring record' });
    }
    res.json({ success: true, data: record });
  } catch (err) {
    next(err);
  }
}

async function store(req, res, next) {
  try {
    let data = { ...req.body };

    if (req.user.role === 'assistant') {
      // asisten: assistant_id otomatis dari token, tidak bisa diisi manual
      data.assistant_id = req.assistant.id;

      // verifikasi equipment ada di lab yang ditugaskan
      const equipment = await equipmentRepository.findById(Number(data.equipment_id));
      if (!equipment) {
        return res.status(404).json({ success: false, message: 'Equipment not found' });
      }
      if (!req.assignedLabIds.includes(equipment.lab_id)) {
        return res.status(403).json({ success: false, message: 'Equipment is not in your assigned lab' });
      }
    }

    const record = await equipmentMonitoringService.createMonitoring(data);
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
