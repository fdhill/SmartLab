const { Router } = require('express');
const labController = require('../controllers/labController');
const { authorize } = require('../middlewares/authenticate');

const router = Router();

// admin only — kelola data master lab
router.get('/', authorize('admin'), labController.index);
router.get('/:id', authorize('admin'), labController.show);
router.post('/', authorize('admin'), labController.store);
router.put('/:id', authorize('admin'), labController.update);
router.delete('/:id', authorize('admin'), labController.destroy);

module.exports = router;
