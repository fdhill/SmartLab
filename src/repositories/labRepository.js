const { pool } = require('../config/database');
const Lab = require('../models/Lab');

async function findAll() {
  const [rows] = await pool.query('SELECT * FROM labs');
  return rows.map((row) => new Lab(row));
}

async function findById(id) {
  const [rows] = await pool.query('SELECT * FROM labs WHERE id = ?', [id]);
  return rows[0] ? new Lab(rows[0]) : null;
}

async function findByStatus(status) {
  const [rows] = await pool.query('SELECT * FROM labs WHERE status = ?', [status]);
  return rows.map((row) => new Lab(row));
}

async function create({ name, location, capacity, status }) {
  const [result] = await pool.query(
    'INSERT INTO labs (name, location, capacity, status) VALUES (?, ?, ?, ?)',
    [name, location, capacity, status ?? Lab.STATUS.ACTIVE]
  );
  return findById(result.insertId);
}

async function update(id, { name, location, capacity, status }) {
  await pool.query(
    'UPDATE labs SET name = ?, location = ?, capacity = ?, status = ? WHERE id = ?',
    [name, location, capacity, status, id]
  );
  return findById(id);
}

async function remove(id) {
  const [result] = await pool.query('DELETE FROM labs WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = { findAll, findById, findByStatus, create, update, remove };
