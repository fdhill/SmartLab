const { pool } = require('../config/database');
const EquipmentMonitoring = require('../models/EquipmentMonitoring');

async function findAll() {
  const [rows] = await pool.query('SELECT * FROM equipment_monitoring');
  return rows.map((row) => new EquipmentMonitoring(row));
}

async function findById(id) {
  const [rows] = await pool.query('SELECT * FROM equipment_monitoring WHERE id = ?', [id]);
  return rows[0] ? new EquipmentMonitoring(rows[0]) : null;
}

async function findByEquipmentId(equipment_id) {
  const [rows] = await pool.query(
    'SELECT * FROM equipment_monitoring WHERE equipment_id = ? ORDER BY check_date DESC',
    [equipment_id]
  );
  return rows.map((row) => new EquipmentMonitoring(row));
}

async function findByAssistantId(assistant_id) {
  const [rows] = await pool.query(
    'SELECT * FROM equipment_monitoring WHERE assistant_id = ? ORDER BY check_date DESC',
    [assistant_id]
  );
  return rows.map((row) => new EquipmentMonitoring(row));
}

async function create({ equipment_id, assistant_id, check_date, condition, notes }) {
  const [result] = await pool.query(
    'INSERT INTO equipment_monitoring (equipment_id, assistant_id, check_date, `condition`, notes) VALUES (?, ?, ?, ?, ?)',
    [equipment_id, assistant_id, check_date, condition, notes ?? null]
  );
  return findById(result.insertId);
}

async function remove(id) {
  const [result] = await pool.query('DELETE FROM equipment_monitoring WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = { findAll, findById, findByEquipmentId, findByAssistantId, create, remove };
