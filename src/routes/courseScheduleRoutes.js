const { Router } = require('express');
const courseScheduleController = require('../controllers/courseScheduleController');
const { authorize } = require('../middlewares/authenticate');
const { resolveAssistant } = require('../middlewares/resolveAssistant');

const router = Router();

// GET: admin semua jadwal, asisten hanya lab yang dijaga
router.get('/', resolveAssistant, courseScheduleController.index);
router.get('/:id', resolveAssistant, courseScheduleController.show);

// CUD: admin only
router.post('/', authorize('admin'), courseScheduleController.store);
router.put('/:id', authorize('admin'), courseScheduleController.update);
router.delete('/:id', authorize('admin'), courseScheduleController.destroy);

module.exports = router;
