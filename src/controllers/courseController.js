const courseService = require('../services/courseService');

async function index(req, res, next) {
  try {
    const courses = await courseService.getAllCourses();
    res.json({ success: true, data: courses });
  } catch (err) {
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const course = await courseService.getCourseById(Number(req.params.id));
    res.json({ success: true, data: course });
  } catch (err) {
    next(err);
  }
}

async function store(req, res, next) {
  try {
    const course = await courseService.createCourse(req.body);
    res.status(201).json({ success: true, data: course });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const course = await courseService.updateCourse(Number(req.params.id), req.body);
    res.json({ success: true, data: course });
  } catch (err) {
    next(err);
  }
}

async function destroy(req, res, next) {
  try {
    await courseService.deleteCourse(Number(req.params.id));
    res.json({ success: true, message: 'Course deleted successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = { index, show, store, update, destroy };
