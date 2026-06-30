const { pool } = require('../config/database');
const Course = require('../models/Course');

async function findAll() {
  const [rows] = await pool.query('SELECT * FROM courses');
  return rows.map((row) => new Course(row));
}

async function findById(id) {
  const [rows] = await pool.query('SELECT * FROM courses WHERE id = ?', [id]);
  return rows[0] ? new Course(rows[0]) : null;
}

async function findByCode(code) {
  const [rows] = await pool.query('SELECT * FROM courses WHERE code = ?', [code]);
  return rows[0] ? new Course(rows[0]) : null;
}

async function create({ code, name, credits }) {
  const [result] = await pool.query(
    'INSERT INTO courses (code, name, credits) VALUES (?, ?, ?)',
    [code, name, credits]
  );
  return findById(result.insertId);
}

async function update(id, { code, name, credits }) {
  await pool.query(
    'UPDATE courses SET code = ?, name = ?, credits = ? WHERE id = ?',
    [code, name, credits, id]
  );
  return findById(id);
}

async function remove(id) {
  const [result] = await pool.query('DELETE FROM courses WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = { findAll, findById, findByCode, create, update, remove };
