const { Router } = require('express');
const courseController = require('../controllers/courseController');
const { authorize } = require('../middlewares/authenticate');

const router = Router();

// admin only — kelola mata kuliah
router.get('/', authorize('admin'), courseController.index);
router.get('/:id', authorize('admin'), courseController.show);
router.post('/', authorize('admin'), courseController.store);
router.put('/:id', authorize('admin'), courseController.update);
router.delete('/:id', authorize('admin'), courseController.destroy);

module.exports = router;
