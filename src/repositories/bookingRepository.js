const { pool } = require('../config/database');
const Booking = require('../models/Booking');

async function findAll() {
  const [rows] = await pool.query('SELECT * FROM bookings');
  return rows.map((row) => new Booking(row));
}

async function findById(id) {
  const [rows] = await pool.query('SELECT * FROM bookings WHERE id = ?', [id]);
  return rows[0] ? new Booking(rows[0]) : null;
}

async function findByUserId(user_id) {
  const [rows] = await pool.query('SELECT * FROM bookings WHERE user_id = ?', [user_id]);
  return rows.map((row) => new Booking(row));
}

async function findByLabId(lab_id) {
  const [rows] = await pool.query('SELECT * FROM bookings WHERE lab_id = ?', [lab_id]);
  return rows.map((row) => new Booking(row));
}

async function findByStatus(status) {
  const [rows] = await pool.query('SELECT * FROM bookings WHERE status = ?', [status]);
  return rows.map((row) => new Booking(row));
}

async function create({ lab_id, user_id, date, start_time, end_time, activity_type, purpose }) {
  const [result] = await pool.query(
    'INSERT INTO bookings (lab_id, user_id, date, start_time, end_time, activity_type, purpose, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [lab_id, user_id, date, start_time, end_time, activity_type, purpose, Booking.STATUS.PENDING]
  );
  return findById(result.insertId);
}

async function updateStatus(id, status) {
  await pool.query('UPDATE bookings SET status = ? WHERE id = ?', [status, id]);
  return findById(id);
}

async function remove(id) {
  const [result] = await pool.query('DELETE FROM bookings WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = { findAll, findById, findByUserId, findByLabId, findByStatus, create, updateStatus, remove };
