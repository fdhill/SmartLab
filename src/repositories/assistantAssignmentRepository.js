const { pool } = require('../config/database');
const AssistantAssignment = require('../models/AssistantAssignment');

async function findAll() {
  const [rows] = await pool.query('SELECT * FROM assistant_assignments');
  return rows.map((row) => new AssistantAssignment(row));
}

async function findById(id) {
  const [rows] = await pool.query('SELECT * FROM assistant_assignments WHERE id = ?', [id]);
  return rows[0] ? new AssistantAssignment(rows[0]) : null;
}

async function findByAssistantId(assistant_id) {
  const [rows] = await pool.query('SELECT * FROM assistant_assignments WHERE assistant_id = ?', [assistant_id]);
  return rows.map((row) => new AssistantAssignment(row));
}

async function findByLabId(lab_id) {
  const [rows] = await pool.query('SELECT * FROM assistant_assignments WHERE lab_id = ?', [lab_id]);
  return rows.map((row) => new AssistantAssignment(row));
}

async function create({ assistant_id, lab_id, day, shift }) {
  const [result] = await pool.query(
    'INSERT INTO assistant_assignments (assistant_id, lab_id, day, shift) VALUES (?, ?, ?, ?)',
    [assistant_id, lab_id, day, shift]
  );
  return findById(result.insertId);
}

async function remove(id) {
  const [result] = await pool.query('DELETE FROM assistant_assignments WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = { findAll, findById, findByAssistantId, findByLabId, create, remove };
