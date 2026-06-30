const { pool } = require('../config/database');
const User = require('../models/User');

async function findAll() {
  const [rows] = await pool.query('SELECT id, name, email, role, phone_number, created_at FROM users');
  return rows.map((row) => new User(row));
}

async function findById(id) {
  const [rows] = await pool.query(
    'SELECT id, name, email, role, phone_number, created_at FROM users WHERE id = ?',
    [id]
  );
  return rows[0] ? new User(rows[0]) : null;
}

async function findByEmail(email) {
  const [rows] = await pool.query(
    'SELECT id, name, email, password, role, phone_number, created_at FROM users WHERE email = ?',
    [email]
  );
  return rows[0] ? new User(rows[0]) : null;
}

async function create({ name, email, password, role, phone_number }) {
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password, role, phone_number) VALUES (?, ?, ?, ?, ?)',
    [name, email, password, role, phone_number ?? null]
  );
  return findById(result.insertId);
}

async function update(id, { name, email, password, role, phone_number }) {
  await pool.query(
    'UPDATE users SET name = ?, email = ?, password = ?, role = ?, phone_number = ? WHERE id = ?',
    [name, email, password, role, phone_number ?? null, id]
  );
  return findById(id);
}

async function remove(id) {
  const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = { findAll, findById, findByEmail, create, update, remove };
