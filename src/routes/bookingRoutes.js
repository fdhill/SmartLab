const { Router } = require('express');
const bookingController = require('../controllers/bookingController');

const router = Router();

router.get('/', bookingController.index);
router.get('/:id', bookingController.show);
router.post('/', bookingController.store);
router.patch('/:id/status', bookingController.updateStatus);
router.delete('/:id', bookingController.destroy);

module.exports = router;
