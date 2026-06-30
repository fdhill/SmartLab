const { Router } = require('express');
const equipmentMonitoringController = require('../controllers/equipmentMonitoringController');
const { authorize } = require('../middlewares/authenticate');
const { resolveAssistant } = require('../middlewares/resolveAssistant');

const router = Router();

// GET: admin semua log, asisten hanya miliknya sendiri
router.get('/', resolveAssistant, equipmentMonitoringController.index);
router.get('/:id', resolveAssistant, equipmentMonitoringController.show);

// POST: asisten input monitoring, admin juga boleh
router.post('/', resolveAssistant, equipmentMonitoringController.store);

// DELETE: admin only
router.delete('/:id', authorize('admin'), equipmentMonitoringController.destroy);

module.exports = router;
