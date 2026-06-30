const { Router } = require('express');
const labController = require('../controllers/labController');

const router = Router();

router.get('/', labController.index);
router.get('/:id', labController.show);
router.post('/', labController.store);
router.put('/:id', labController.update);
router.delete('/:id', labController.destroy);

module.exports = router;
