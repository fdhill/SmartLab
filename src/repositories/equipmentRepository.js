const { pool } = require('../config/database');
const Equipment = require('../models/Equipment');

async function findAll() {
  const [rows] = await pool.query('SELECT * FROM equipment');
  return rows.map((row) => new Equipment(row));
}

async function findById(id) {
  const [rows] = await pool.query('SELECT * FROM equipment WHERE id = ?', [id]);
  return rows[0] ? new Equipment(rows[0]) : null;
}

async function findByLabId(lab_id) {
  const [rows] = await pool.query('SELECT * FROM equipment WHERE lab_id = ?', [lab_id]);
  return rows.map((row) => new Equipment(row));
}

async function findByCode(code) {
  const [rows] = await pool.query('SELECT * FROM equipment WHERE code = ?', [code]);
  return rows[0] ? new Equipment(rows[0]) : null;
}

async function findByLabIds(labIds) {
  if (!labIds.length) return [];
  const placeholders = labIds.map(() => '?').join(', ');
  const [rows] = await pool.query(`SELECT * FROM equipment WHERE lab_id IN (${placeholders})`, labIds);
  return rows.map((row) => new Equipment(row));
}

async function create({ lab_id, name, code, quantity, condition }) {
  const [result] = await pool.query(
    'INSERT INTO equipment (lab_id, name, code, quantity, `condition`) VALUES (?, ?, ?, ?, ?)',
    [lab_id, name, code, quantity ?? 1, condition ?? Equipment.CONDITION.GOOD]
  );
  return findById(result.insertId);
}

async function update(id, { lab_id, name, code, quantity, condition }) {
  await pool.query(
    'UPDATE equipment SET lab_id = ?, name = ?, code = ?, quantity = ?, `condition` = ? WHERE id = ?',
    [lab_id, name, code, quantity, condition, id]
  );
  return findById(id);
}

async function remove(id) {
  const [result] = await pool.query('DELETE FROM equipment WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = { findAll, findById, findByLabId, findByLabIds, findByCode, create, update, remove };
