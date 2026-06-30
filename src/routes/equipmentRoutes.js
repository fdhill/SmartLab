const { Router } = require('express');
const equipmentController = require('../controllers/equipmentController');
const { authorize } = require('../middlewares/authenticate');
const { resolveAssistant } = require('../middlewares/resolveAssistant');

const router = Router();

// GET: admin semua alat, asisten hanya lab yang dijaga
router.get('/', resolveAssistant, equipmentController.index);
router.get('/:id', resolveAssistant, equipmentController.show);

// CUD: admin only (data master alat)
router.post('/', authorize('admin'), equipmentController.store);
router.put('/:id', authorize('admin'), equipmentController.update);
router.delete('/:id', authorize('admin'), equipmentController.destroy);

module.exports = router;
