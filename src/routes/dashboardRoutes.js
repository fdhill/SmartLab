const { Router } = require('express');
const dashboardController = require('../controllers/dashboardController');
const { authorize } = require('../middlewares/authenticate');

const router = Router();

router.get('/', authorize('admin'), dashboardController.summary);

module.exports = router;
