const bcrypt = require('bcryptjs');

/**
 * @param {import('knex').Knex} knex
 */
exports.seed = async function (knex) {
  // ── hapus data lama (urutan terbalik dari FK) ─────────────────────────────
  await knex('assistant_assignments').del();
  await knex('equipment_monitoring').del();
  await knex('bookings').del();
  await knex('equipment').del();
  await knex('course_schedules').del();
  await knex('lab_assistants').del();
  await knex('courses').del();
  await knex('labs').del();
  await knex('users').del();

  // ── 1. users ──────────────────────────────────────────────────────────────
  const hash = (pw) => bcrypt.hashSync(pw, 10);

  const [adminId, lecturerId, asisten1Id, asisten2Id] = await knex('users')
    .insert([
      { name: 'Admin SmartLab',  email: 'admin@smartlab.id',   password: hash('admin123'),   role: 'admin',     phone_number: '081200000001' },
      { name: 'Dr. Dosen',       email: 'dosen@smartlab.id',   password: hash('dosen123'),   role: 'lecturer',  phone_number: '081200000002' },
      { name: 'Budi Setiawan',   email: 'budi@smartlab.id',    password: hash('asisten123'), role: 'assistant', phone_number: '081200000003' },
      { name: 'Citra Dewi',      email: 'citra@smartlab.id',   password: hash('asisten123'), role: 'assistant', phone_number: '081200000004' },
    ])
    .then(() => knex('users').select('id').orderBy('id'))
    .then((rows) => rows.map((r) => r.id));

  // ── 2. labs ───────────────────────────────────────────────────────────────
  const [labJaringanId, labPemrogramanId, labElektronikaId] = await knex('labs')
    .insert([
      { name: 'Lab Jaringan Komputer', location: 'Gedung A Lt.2', capacity: 30, status: 'active' },
      { name: 'Lab Pemrograman',       location: 'Gedung B Lt.1', capacity: 25, status: 'active' },
      { name: 'Lab Elektronika',       location: 'Gedung C Lt.3', capacity: 20, status: 'maintenance' },
    ])
    .then(() => knex('labs').select('id').orderBy('id'))
    .then((rows) => rows.map((r) => r.id));

  // ── 3. courses ────────────────────────────────────────────────────────────
  const [courseJaringanId, coursePemrogramanId, courseElektronikaId] = await knex('courses')
    .insert([
      { code: 'IF001', name: 'Jaringan Komputer',       credits: 3 },
      { code: 'IF002', name: 'Algoritma & Pemrograman', credits: 3 },
      { code: 'IF003', name: 'Elektronika Dasar',       credits: 2 },
    ])
    .then(() => knex('courses').select('id').orderBy('id'))
    .then((rows) => rows.map((r) => r.id));

  // ── 4. lab_assistants ─────────────────────────────────────────────────────
  const [asBudiId, asCitraId] = await knex('lab_assistants')
    .insert([
      { user_id: asisten1Id, student_id: '2021001', period: 'Ganjil 2024/2025' },
      { user_id: asisten2Id, student_id: '2021002', period: 'Ganjil 2024/2025' },
    ])
    .then(() => knex('lab_assistants').select('id').orderBy('id'))
    .then((rows) => rows.map((r) => r.id));

  // ── 5. course_schedules ───────────────────────────────────────────────────
  await knex('course_schedules').insert([
    { lab_id: labJaringanId,    course_id: courseJaringanId,    lecturer_id: lecturerId, day: 'monday',    start_time: '08:00:00', end_time: '10:30:00', class: 'A', semester: 'Ganjil 2024/2025' },
    { lab_id: labJaringanId,    course_id: courseJaringanId,    lecturer_id: lecturerId, day: 'wednesday', start_time: '13:00:00', end_time: '15:30:00', class: 'B', semester: 'Ganjil 2024/2025' },
    { lab_id: labPemrogramanId, course_id: coursePemrogramanId, lecturer_id: lecturerId, day: 'tuesday',   start_time: '10:00:00', end_time: '12:30:00', class: 'A', semester: 'Ganjil 2024/2025' },
    { lab_id: labPemrogramanId, course_id: coursePemrogramanId, lecturer_id: lecturerId, day: 'thursday',  start_time: '08:00:00', end_time: '10:30:00', class: 'B', semester: 'Ganjil 2024/2025' },
    { lab_id: labElektronikaId, course_id: courseElektronikaId, lecturer_id: lecturerId, day: 'friday',    start_time: '09:00:00', end_time: '11:00:00', class: 'A', semester: 'Ganjil 2024/2025' },
  ]);

  // ── 6. equipment ──────────────────────────────────────────────────────────
  const [routerId, switchId, , pcId, monitorId, oscilloscopeId] = await knex('equipment')
    .insert([
      { lab_id: labJaringanId,    name: 'Router Cisco',    code: 'JRG-001', quantity: 5,  condition: 'good' },
      { lab_id: labJaringanId,    name: 'Switch HP',       code: 'JRG-002', quantity: 8,  condition: 'good' },
      { lab_id: labJaringanId,    name: 'Kabel UTP Cat6',  code: 'JRG-003', quantity: 50, condition: 'good' },
      { lab_id: labPemrogramanId, name: 'PC Desktop',      code: 'PRG-001', quantity: 25, condition: 'good' },
      { lab_id: labPemrogramanId, name: 'Monitor 24"',     code: 'PRG-002', quantity: 25, condition: 'minor_damage' },
      { lab_id: labElektronikaId, name: 'Oscilloscope',    code: 'ELK-001', quantity: 3,  condition: 'major_damage' },
      { lab_id: labElektronikaId, name: 'Multimeter',      code: 'ELK-002', quantity: 10, condition: 'good' },
    ])
    .then(() => knex('equipment').select('id').orderBy('id'))
    .then((rows) => rows.map((r) => r.id));

  // ── 7. bookings ───────────────────────────────────────────────────────────
  await knex('bookings').insert([
    { lab_id: labJaringanId,    user_id: adminId, date: '2025-07-05', start_time: '13:00:00', end_time: '15:00:00', activity_type: 'seminar',    purpose: 'Seminar jaringan komputer',       status: 'pending' },
    { lab_id: labPemrogramanId, user_id: adminId, date: '2025-07-07', start_time: '09:00:00', end_time: '11:00:00', activity_type: 'research',   purpose: 'Penelitian machine learning',     status: 'approved' },
    { lab_id: labJaringanId,    user_id: adminId, date: '2025-06-20', start_time: '10:00:00', end_time: '12:00:00', activity_type: 'practicum',  purpose: 'Praktikum susulan jaringan',      status: 'completed' },
    { lab_id: labPemrogramanId, user_id: adminId, date: '2025-07-10', start_time: '14:00:00', end_time: '16:00:00', activity_type: 'other',      purpose: 'Pelatihan coding mahasiswa baru', status: 'pending' },
    { lab_id: labElektronikaId, user_id: adminId, date: '2025-07-03', start_time: '08:00:00', end_time: '10:00:00', activity_type: 'practicum',  purpose: 'Praktikum elektronika susulan',   status: 'rejected' },
  ]);

  // ── 8. assistant_assignments (penugasan piket) ────────────────────────────
  await knex('assistant_assignments').insert([
    { assistant_id: asBudiId,  lab_id: labJaringanId,    day: 'monday',    shift: 'morning' },
    { assistant_id: asBudiId,  lab_id: labJaringanId,    day: 'wednesday', shift: 'afternoon' },
    { assistant_id: asCitraId, lab_id: labPemrogramanId, day: 'tuesday',   shift: 'morning' },
    { assistant_id: asCitraId, lab_id: labPemrogramanId, day: 'thursday',  shift: 'morning' },
  ]);

  // ── 9. equipment_monitoring ───────────────────────────────────────────────
  await knex('equipment_monitoring').insert([
    { equipment_id: routerId,        assistant_id: asBudiId,  check_date: '2025-06-23', condition: 'good',         notes: 'Semua router berfungsi normal' },
    { equipment_id: switchId,        assistant_id: asBudiId,  check_date: '2025-06-23', condition: 'good',         notes: 'Port switch aktif semua' },
    { equipment_id: pcId,            assistant_id: asCitraId, check_date: '2025-06-24', condition: 'good',         notes: 'PC berjalan normal, OS up-to-date' },
    { equipment_id: monitorId,       assistant_id: asCitraId, check_date: '2025-06-24', condition: 'minor_damage', notes: '3 monitor layarnya retak di sudut' },
    { equipment_id: oscilloscopeId,  assistant_id: asBudiId,  check_date: '2025-06-25', condition: 'major_damage', notes: 'Oscilloscope tidak menyala, perlu servis segera' },
  ]);

  console.log('✓ Seed selesai — semua data berhasil dimasukkan');
};
