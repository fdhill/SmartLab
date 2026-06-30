const { Router } = require('express');
const userController = require('../controllers/userController');
const { authorize } = require('../middlewares/authenticate');

const router = Router();

// admin only — kelola semua akun
router.get('/', authorize('admin'), userController.index);
router.get('/:id', authorize('admin'), userController.show);
router.post('/', authorize('admin'), userController.store);
router.put('/:id', authorize('admin'), userController.update);
router.delete('/:id', authorize('admin'), userController.destroy);

module.exports = router;
