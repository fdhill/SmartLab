const { Router } = require('express');
const equipmentMonitoringController = require('../controllers/equipmentMonitoringController');

const router = Router();

router.get('/', equipmentMonitoringController.index);
router.get('/:id', equipmentMonitoringController.show);
router.post('/', equipmentMonitoringController.store);
router.delete('/:id', equipmentMonitoringController.destroy);

module.exports = router;
