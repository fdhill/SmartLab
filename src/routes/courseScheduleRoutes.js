const { Router } = require('express');
const courseScheduleController = require('../controllers/courseScheduleController');

const router = Router();

router.get('/', courseScheduleController.index);
router.get('/:id', courseScheduleController.show);
router.post('/', courseScheduleController.store);
router.put('/:id', courseScheduleController.update);
router.delete('/:id', courseScheduleController.destroy);

module.exports = router;
