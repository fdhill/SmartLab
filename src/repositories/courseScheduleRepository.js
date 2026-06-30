const { pool } = require('../config/database');
const CourseSchedule = require('../models/CourseSchedule');

async function findAll() {
  const [rows] = await pool.query('SELECT * FROM course_schedules');
  return rows.map((row) => new CourseSchedule(row));
}

async function findById(id) {
  const [rows] = await pool.query('SELECT * FROM course_schedules WHERE id = ?', [id]);
  return rows[0] ? new CourseSchedule(rows[0]) : null;
}

async function findByLabId(lab_id) {
  const [rows] = await pool.query('SELECT * FROM course_schedules WHERE lab_id = ?', [lab_id]);
  return rows.map((row) => new CourseSchedule(row));
}

async function findByLecturerId(lecturer_id) {
  const [rows] = await pool.query('SELECT * FROM course_schedules WHERE lecturer_id = ?', [lecturer_id]);
  return rows.map((row) => new CourseSchedule(row));
}

async function findByDay(day) {
  const [rows] = await pool.query('SELECT * FROM course_schedules WHERE day = ?', [day]);
  return rows.map((row) => new CourseSchedule(row));
}

async function create({ lab_id, course_id, lecturer_id, day, start_time, end_time, class: className, semester }) {
  const [result] = await pool.query(
    'INSERT INTO course_schedules (lab_id, course_id, lecturer_id, day, start_time, end_time, class, semester) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [lab_id, course_id, lecturer_id, day, start_time, end_time, className, semester]
  );
  return findById(result.insertId);
}

async function update(id, { lab_id, course_id, lecturer_id, day, start_time, end_time, class: className, semester }) {
  await pool.query(
    'UPDATE course_schedules SET lab_id = ?, course_id = ?, lecturer_id = ?, day = ?, start_time = ?, end_time = ?, class = ?, semester = ? WHERE id = ?',
    [lab_id, course_id, lecturer_id, day, start_time, end_time, className, semester, id]
  );
  return findById(id);
}

async function remove(id) {
  const [result] = await pool.query('DELETE FROM course_schedules WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = { findAll, findById, findByLabId, findByLecturerId, findByDay, create, update, remove };
