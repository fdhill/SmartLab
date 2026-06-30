const { pool } = require('../config/database');

async function getSummary() {
  const [[labStats], [bookingStats], [damagedEquipment]] = await Promise.all([
    pool.query(`
      SELECT status, COUNT(*) AS total
      FROM labs
      GROUP BY status
    `),
    pool.query(`
      SELECT status, COUNT(*) AS total
      FROM bookings
      GROUP BY status
    `),
    pool.query(`
      SELECT e.id, e.name, e.code, e.condition, e.quantity, l.name AS lab_name
      FROM equipment e
      JOIN labs l ON l.id = e.lab_id
      WHERE e.condition IN ('minor_damage', 'major_damage')
      ORDER BY e.condition DESC, l.name
    `),
  ]);

  const labs = { active: 0, inactive: 0, maintenance: 0 };
  labStats.forEach((row) => { labs[row.status] = Number(row.total); });

  const bookings = { pending: 0, approved: 0, rejected: 0, completed: 0 };
  bookingStats.forEach((row) => { bookings[row.status] = Number(row.total); });

  return {
    labs,
    bookings,
    damaged_equipment: damagedEquipment,
  };
}

module.exports = { getSummary };
