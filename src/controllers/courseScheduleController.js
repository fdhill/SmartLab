const courseScheduleService = require('../services/courseScheduleService');
const courseScheduleRepository = require('../repositories/courseScheduleRepository');
const { ok, created, fail } = require('../utils/response');

async function index(req, res, next) {
  try {
    let schedules;
    if (req.user.role === 'admin') {
      const { lab_id, day } = req.query;
      if (lab_id) {
        schedules = await courseScheduleService.getSchedulesByLab(Number(lab_id));
      } else if (day) {
        schedules = await courseScheduleService.getSchedulesByDay(day);
      } else {
        schedules = await courseScheduleService.getAllSchedules();
      }
    } else {
      schedules = await courseScheduleRepository.findByLabIds(req.assignedLabIds);
    }
    ok(res, schedules, 'Course schedules retrieved successfully');
  } catch (err) {
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const schedule = await courseScheduleService.getScheduleById(Number(req.params.id));
    if (req.user.role === 'assistant' && !req.assignedLabIds.includes(schedule.lab_id)) {
      return fail(res, 'Access denied to this schedule', 403);
    }
    ok(res, schedule, 'Course schedule retrieved successfully');
  } catch (err) {
    next(err);
  }
}

async function store(req, res, next) {
  try {
    const schedule = await courseScheduleService.createSchedule(req.body);
    created(res, schedule, 'Course schedule created successfully');
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const schedule = await courseScheduleService.updateSchedule(Number(req.params.id), req.body);
    ok(res, schedule, 'Course schedule updated successfully');
  } catch (err) {
    next(err);
  }
}

async function destroy(req, res, next) {
  try {
    await courseScheduleService.deleteSchedule(Number(req.params.id));
    ok(res, null, 'Course schedule deleted successfully');
  } catch (err) {
    next(err);
  }
}

module.exports = { index, show, store, update, destroy };
