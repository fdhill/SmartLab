const { Router } = require('express');
const courseController = require('../controllers/courseController');

const router = Router();

router.get('/', courseController.index);
router.get('/:id', courseController.show);
router.post('/', courseController.store);
router.put('/:id', courseController.update);
router.delete('/:id', courseController.destroy);

module.exports = router;
