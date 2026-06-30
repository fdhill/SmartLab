const courseRepository = require('../repositories/courseRepository');

function assertFound(course, id) {
  if (!course) {
    const err = new Error(`Course with id ${id} not found`);
    err.status = 404;
    throw err;
  }
}

async function getAllCourses() {
  return courseRepository.findAll();
}

async function getCourseById(id) {
  const course = await courseRepository.findById(id);
  assertFound(course, id);
  return course;
}

async function createCourse({ code, name, credits }) {
  if (!code || !name || !credits) {
    const err = new Error('code, name, and credits are required');
    err.status = 400;
    throw err;
  }

  if (!Number.isInteger(Number(credits)) || Number(credits) < 1 || Number(credits) > 6) {
    const err = new Error('credits must be an integer between 1 and 6');
    err.status = 400;
    throw err;
  }

  const existing = await courseRepository.findByCode(code);
  if (existing) {
    const err = new Error(`Course with code "${code}" already exists`);
    err.status = 409;
    throw err;
  }

  return courseRepository.create({ code, name, credits });
}

async function updateCourse(id, { code, name, credits }) {
  const course = await courseRepository.findById(id);
  assertFound(course, id);

  if (credits && (!Number.isInteger(Number(credits)) || Number(credits) < 1 || Number(credits) > 6)) {
    const err = new Error('credits must be an integer between 1 and 6');
    err.status = 400;
    throw err;
  }

  if (code && code !== course.code) {
    const existing = await courseRepository.findByCode(code);
    if (existing) {
      const err = new Error(`Course with code "${code}" already exists`);
      err.status = 409;
      throw err;
    }
  }

  return courseRepository.update(id, {
    code: code ?? course.code,
    name: name ?? course.name,
    credits: credits ?? course.credits,
  });
}

async function deleteCourse(id) {
  const course = await courseRepository.findById(id);
  assertFound(course, id);
  return courseRepository.remove(id);
}

module.exports = { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse };
