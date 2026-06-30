const { Router } = require('express');
const labAssistantController = require('../controllers/labAssistantController');
const { authorize } = require('../middlewares/authenticate');

const router = Router();

// admin only — kelola data asisten lab
router.get('/', authorize('admin'), labAssistantController.index);
router.get('/:id', authorize('admin'), labAssistantController.show);
router.post('/', authorize('admin'), labAssistantController.store);
router.put('/:id', authorize('admin'), labAssistantController.update);
router.delete('/:id', authorize('admin'), labAssistantController.destroy);

module.exports = router;
