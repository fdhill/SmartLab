const { Router } = require('express');
const equipmentController = require('../controllers/equipmentController');

const router = Router();

router.get('/', equipmentController.index);
router.get('/:id', equipmentController.show);
router.post('/', equipmentController.store);
router.put('/:id', equipmentController.update);
router.delete('/:id', equipmentController.destroy);

module.exports = router;
