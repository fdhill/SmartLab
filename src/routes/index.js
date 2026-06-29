const { Router } = require('express');
const userRoutes = require('./userRoutes');

const router = Router();

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'SmartLab API is running', timestamp: new Date() });
});

router.use('/users', userRoutes);

module.exports = router;
