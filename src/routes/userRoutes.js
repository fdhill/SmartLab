const { Router } = require('express');
const userController = require('../controllers/userController');

const router = Router();

router.get('/', userController.index);
router.get('/:id', userController.show);
router.post('/', userController.store);

module.exports = router;
