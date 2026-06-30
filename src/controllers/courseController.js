const courseService = require('../services/courseService');
const { ok, created } = require('../utils/response');

async function index(req, res, next) {
  try {
    const courses = await courseService.getAllCourses();
    ok(res, courses, 'Courses retrieved successfully');
  } catch (err) {
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const course = await courseService.getCourseById(Number(req.params.id));
    ok(res, course, 'Course retrieved successfully');
  } catch (err) {
    next(err);
  }
}

async function store(req, res, next) {
  try {
    const course = await courseService.createCourse(req.body);
    created(res, course, 'Course created successfully');
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const course = await courseService.updateCourse(Number(req.params.id), req.body);
    ok(res, course, 'Course updated successfully');
  } catch (err) {
    next(err);
  }
}

async function destroy(req, res, next) {
  try {
    await courseService.deleteCourse(Number(req.params.id));
    ok(res, null, 'Course deleted successfully');
  } catch (err) {
    next(err);
  }
}

module.exports = { index, show, store, update, destroy };
