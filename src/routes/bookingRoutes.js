const { Router } = require('express');
const bookingController = require('../controllers/bookingController');
const { authorize } = require('../middlewares/authenticate');
const { resolveAssistant } = require('../middlewares/resolveAssistant');

const router = Router();

// GET: admin semua booking, asisten hanya lab yang dijaga
router.get('/', resolveAssistant, bookingController.index);
router.get('/:id', resolveAssistant, bookingController.show);

// POST: semua role boleh mengajukan booking
router.post('/', bookingController.store);

// PATCH status: admin only (persetujuan peminjaman)
router.patch('/:id/status', authorize('admin'), bookingController.updateStatus);

// DELETE: admin only
router.delete('/:id', authorize('admin'), bookingController.destroy);

module.exports = router;
