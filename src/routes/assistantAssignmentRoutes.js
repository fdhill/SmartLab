const { Router } = require('express');
const assistantAssignmentController = require('../controllers/assistantAssignmentController');

const router = Router();

router.get('/', assistantAssignmentController.index);
router.get('/:id', assistantAssignmentController.show);
router.post('/', assistantAssignmentController.store);
router.delete('/:id', assistantAssignmentController.destroy);

module.exports = router;
