const { Router } = require('express');
const assistantAssignmentController = require('../controllers/assistantAssignmentController');
const { authorize } = require('../middlewares/authenticate');
const { resolveAssistant } = require('../middlewares/resolveAssistant');

const router = Router();

// GET: admin semua penugasan, asisten hanya jadwal piket sendiri
router.get('/', resolveAssistant, assistantAssignmentController.index);
router.get('/:id', resolveAssistant, assistantAssignmentController.show);

// CUD: admin only (penugasan piket)
router.post('/', authorize('admin'), assistantAssignmentController.store);
router.delete('/:id', authorize('admin'), assistantAssignmentController.destroy);

module.exports = router;
