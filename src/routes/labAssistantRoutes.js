const { Router } = require('express');
const labAssistantController = require('../controllers/labAssistantController');

const router = Router();

router.get('/', labAssistantController.index);
router.get('/:id', labAssistantController.show);
router.post('/', labAssistantController.store);
router.put('/:id', labAssistantController.update);
router.delete('/:id', labAssistantController.destroy);

module.exports = router;
