const courseScheduleService = require('../services/courseScheduleService');

async function index(req, res, next) {
  try {
    const { lab_id, day } = req.query;
    let schedules;
    if (lab_id) {
      schedules = await courseScheduleService.getSchedulesByLab(Number(lab_id));
    } else if (day) {
      schedules = await courseScheduleService.getSchedulesByDay(day);
    } else {
      schedules = await courseScheduleService.getAllSchedules();
    }
    res.json({ success: true, data: schedules });
  } catch (err) {
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const schedule = await courseScheduleService.getScheduleById(Number(req.params.id));
    res.json({ success: true, data: schedule });
  } catch (err) {
    next(err);
  }
}

async function store(req, res, next) {
  try {
    const schedule = await courseScheduleService.createSchedule(req.body);
    res.status(201).json({ success: true, data: schedule });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const schedule = await courseScheduleService.updateSchedule(Number(req.params.id), req.body);
    res.json({ success: true, data: schedule });
  } catch (err) {
    next(err);
  }
}

async function destroy(req, res, next) {
  try {
    await courseScheduleService.deleteSchedule(Number(req.params.id));
    res.json({ success: true, message: 'Course schedule deleted successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = { index, show, store, update, destroy };
