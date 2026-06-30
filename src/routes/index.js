const { Router } = require('express');
const userRoutes = require('./userRoutes');
const labRoutes = require('./labRoutes');
const courseRoutes = require('./courseRoutes');
const courseScheduleRoutes = require('./courseScheduleRoutes');
const bookingRoutes = require('./bookingRoutes');
const equipmentRoutes = require('./equipmentRoutes');
const equipmentMonitoringRoutes = require('./equipmentMonitoringRoutes');
const labAssistantRoutes = require('./labAssistantRoutes');
const assistantAssignmentRoutes = require('./assistantAssignmentRoutes');

const router = Router();

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'SmartLab API is running', timestamp: new Date() });
});

router.use('/users', userRoutes);
router.use('/labs', labRoutes);
router.use('/courses', courseRoutes);
router.use('/course-schedules', courseScheduleRoutes);
router.use('/bookings', bookingRoutes);
router.use('/equipment', equipmentRoutes);
router.use('/equipment-monitoring', equipmentMonitoringRoutes);
router.use('/lab-assistants', labAssistantRoutes);
router.use('/assistant-assignments', assistantAssignmentRoutes);

module.exports = router;
