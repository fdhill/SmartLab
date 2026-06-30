const courseScheduleRepository = require('../repositories/courseScheduleRepository');
const labRepository = require('../repositories/labRepository');
const courseRepository = require('../repositories/courseRepository');
const userRepository = require('../repositories/userRepository');
const CourseSchedule = require('../models/CourseSchedule');
const User = require('../models/User');

function assertFound(schedule, id) {
  if (!schedule) {
    const err = new Error(`Course schedule with id ${id} not found`);
    err.status = 404;
    throw err;
  }
}

function hasTimeConflict(existingSchedules, { day, start_time, end_time, excludeId }) {
  return existingSchedules.some((s) => {
    if (s.id === excludeId) return false;
    if (s.day !== day) return false;
    return s.start_time < end_time && s.end_time > start_time;
  });
}

async function getAllSchedules() {
  return courseScheduleRepository.findAll();
}

async function getScheduleById(id) {
  const schedule = await courseScheduleRepository.findById(id);
  assertFound(schedule, id);
  return schedule;
}

async function getSchedulesByLab(lab_id) {
  const lab = await labRepository.findById(lab_id);
  if (!lab) {
    const err = new Error(`Lab with id ${lab_id} not found`);
    err.status = 404;
    throw err;
  }
  return courseScheduleRepository.findByLabId(lab_id);
}

async function getSchedulesByDay(day) {
  if (!Object.values(CourseSchedule.DAY).includes(day)) {
    const err = new Error(`Invalid day. Must be one of: ${Object.values(CourseSchedule.DAY).join(', ')}`);
    err.status = 400;
    throw err;
  }
  return courseScheduleRepository.findByDay(day);
}

async function createSchedule({ lab_id, course_id, lecturer_id, day, start_time, end_time, class: className, semester }) {
  if (!lab_id || !course_id || !lecturer_id || !day || !start_time || !end_time || !className || !semester) {
    const err = new Error('lab_id, course_id, lecturer_id, day, start_time, end_time, class, and semester are required');
    err.status = 400;
    throw err;
  }

  if (!Object.values(CourseSchedule.DAY).includes(day)) {
    const err = new Error(`Invalid day. Must be one of: ${Object.values(CourseSchedule.DAY).join(', ')}`);
    err.status = 400;
    throw err;
  }

  const [lab, course, lecturer] = await Promise.all([
    labRepository.findById(lab_id),
    courseRepository.findById(course_id),
    userRepository.findById(lecturer_id),
  ]);

  if (!lab) { const err = new Error(`Lab with id ${lab_id} not found`); err.status = 404; throw err; }
  if (!course) { const err = new Error(`Course with id ${course_id} not found`); err.status = 404; throw err; }
  if (!lecturer) { const err = new Error(`Lecturer with id ${lecturer_id} not found`); err.status = 404; throw err; }
  if (lecturer.role !== User.ROLE.LECTURER) {
    const err = new Error('The assigned user is not a lecturer');
    err.status = 400;
    throw err;
  }

  const existing = await courseScheduleRepository.findByLabId(lab_id);
  if (hasTimeConflict(existing, { day, start_time, end_time })) {
    const err = new Error('Schedule conflicts with an existing schedule in this lab');
    err.status = 409;
    throw err;
  }

  return courseScheduleRepository.create({ lab_id, course_id, lecturer_id, day, start_time, end_time, class: className, semester });
}

async function updateSchedule(id, { lab_id, course_id, lecturer_id, day, start_time, end_time, class: className, semester }) {
  const schedule = await courseScheduleRepository.findById(id);
  assertFound(schedule, id);

  const merged = {
    lab_id: lab_id ?? schedule.lab_id,
    course_id: course_id ?? schedule.course_id,
    lecturer_id: lecturer_id ?? schedule.lecturer_id,
    day: day ?? schedule.day,
    start_time: start_time ?? schedule.start_time,
    end_time: end_time ?? schedule.end_time,
    class: className ?? schedule.class,
    semester: semester ?? schedule.semester,
  };

  if (day && !Object.values(CourseSchedule.DAY).includes(day)) {
    const err = new Error(`Invalid day. Must be one of: ${Object.values(CourseSchedule.DAY).join(', ')}`);
    err.status = 400;
    throw err;
  }

  const existing = await courseScheduleRepository.findByLabId(merged.lab_id);
  if (hasTimeConflict(existing, { day: merged.day, start_time: merged.start_time, end_time: merged.end_time, excludeId: id })) {
    const err = new Error('Schedule conflicts with an existing schedule in this lab');
    err.status = 409;
    throw err;
  }

  return courseScheduleRepository.update(id, merged);
}

async function deleteSchedule(id) {
  const schedule = await courseScheduleRepository.findById(id);
  assertFound(schedule, id);
  return courseScheduleRepository.remove(id);
}

module.exports = { getAllSchedules, getScheduleById, getSchedulesByLab, getSchedulesByDay, createSchedule, updateSchedule, deleteSchedule };
