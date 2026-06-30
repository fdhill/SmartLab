const { pool } = require('../config/database');
const LabAssistant = require('../models/LabAssistant');

async function findAll() {
  const [rows] = await pool.query('SELECT * FROM lab_assistants');
  return rows.map((row) => new LabAssistant(row));
}

async function findById(id) {
  const [rows] = await pool.query('SELECT * FROM lab_assistants WHERE id = ?', [id]);
  return rows[0] ? new LabAssistant(rows[0]) : null;
}

async function findByUserId(user_id) {
  const [rows] = await pool.query('SELECT * FROM lab_assistants WHERE user_id = ?', [user_id]);
  return rows[0] ? new LabAssistant(rows[0]) : null;
}

async function findByStudentId(student_id) {
  const [rows] = await pool.query('SELECT * FROM lab_assistants WHERE student_id = ?', [student_id]);
  return rows[0] ? new LabAssistant(rows[0]) : null;
}

async function create({ user_id, student_id, period }) {
  const [result] = await pool.query(
    'INSERT INTO lab_assistants (user_id, student_id, period) VALUES (?, ?, ?)',
    [user_id, student_id, period]
  );
  return findById(result.insertId);
}

async function update(id, { student_id, period }) {
  await pool.query(
    'UPDATE lab_assistants SET student_id = ?, period = ? WHERE id = ?',
    [student_id, period, id]
  );
  return findById(id);
}

async function remove(id) {
  const [result] = await pool.query('DELETE FROM lab_assistants WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = { findAll, findById, findByUserId, findByStudentId, create, update, remove };
