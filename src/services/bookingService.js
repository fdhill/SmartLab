const bookingRepository = require('../repositories/bookingRepository');
const labRepository = require('../repositories/labRepository');
const userRepository = require('../repositories/userRepository');
const Booking = require('../models/Booking');

function assertFound(booking, id) {
  if (!booking) {
    const err = new Error(`Booking with id ${id} not found`);
    err.status = 404;
    throw err;
  }
}

const VALID_TRANSITIONS = {
  [Booking.STATUS.PENDING]: [Booking.STATUS.APPROVED, Booking.STATUS.REJECTED],
  [Booking.STATUS.APPROVED]: [Booking.STATUS.COMPLETED],
  [Booking.STATUS.REJECTED]: [],
  [Booking.STATUS.COMPLETED]: [],
};

function hasTimeConflict(existingBookings, { date, start_time, end_time, excludeId }) {
  return existingBookings.some((b) => {
    if (b.id === excludeId) return false;
    if (b.status === Booking.STATUS.REJECTED) return false;
    if (String(b.date).slice(0, 10) !== String(date).slice(0, 10)) return false;
    return b.start_time < end_time && b.end_time > start_time;
  });
}

async function getAllBookings() {
  return bookingRepository.findAll();
}

async function getBookingById(id) {
  const booking = await bookingRepository.findById(id);
  assertFound(booking, id);
  return booking;
}

async function getBookingsByUser(user_id) {
  const user = await userRepository.findById(user_id);
  if (!user) {
    const err = new Error(`User with id ${user_id} not found`);
    err.status = 404;
    throw err;
  }
  return bookingRepository.findByUserId(user_id);
}

async function getBookingsByStatus(status) {
  if (!Object.values(Booking.STATUS).includes(status)) {
    const err = new Error(`Invalid status. Must be one of: ${Object.values(Booking.STATUS).join(', ')}`);
    err.status = 400;
    throw err;
  }
  return bookingRepository.findByStatus(status);
}

async function createBooking({ lab_id, user_id, date, start_time, end_time, activity_type, purpose }) {
  if (!lab_id || !user_id || !date || !start_time || !end_time || !activity_type || !purpose) {
    const err = new Error('lab_id, user_id, date, start_time, end_time, activity_type, and purpose are required');
    err.status = 400;
    throw err;
  }

  if (!Object.values(Booking.ACTIVITY_TYPE).includes(activity_type)) {
    const err = new Error(`Invalid activity_type. Must be one of: ${Object.values(Booking.ACTIVITY_TYPE).join(', ')}`);
    err.status = 400;
    throw err;
  }

  const [lab, user] = await Promise.all([
    labRepository.findById(lab_id),
    userRepository.findById(user_id),
  ]);

  if (!lab) { const err = new Error(`Lab with id ${lab_id} not found`); err.status = 404; throw err; }
  if (!user) { const err = new Error(`User with id ${user_id} not found`); err.status = 404; throw err; }

  const existing = await bookingRepository.findByLabId(lab_id);
  if (hasTimeConflict(existing, { date, start_time, end_time })) {
    const err = new Error('The lab is already booked during the requested time');
    err.status = 409;
    throw err;
  }

  return bookingRepository.create({ lab_id, user_id, date, start_time, end_time, activity_type, purpose });
}

async function updateBookingStatus(id, status) {
  if (!Object.values(Booking.STATUS).includes(status)) {
    const err = new Error(`Invalid status. Must be one of: ${Object.values(Booking.STATUS).join(', ')}`);
    err.status = 400;
    throw err;
  }

  const booking = await bookingRepository.findById(id);
  assertFound(booking, id);

  const allowed = VALID_TRANSITIONS[booking.status];
  if (!allowed.includes(status)) {
    const err = new Error(`Cannot transition booking from "${booking.status}" to "${status}"`);
    err.status = 422;
    throw err;
  }

  return bookingRepository.updateStatus(id, status);
}

async function deleteBooking(id) {
  const booking = await bookingRepository.findById(id);
  assertFound(booking, id);
  return bookingRepository.remove(id);
}

module.exports = { getAllBookings, getBookingById, getBookingsByUser, getBookingsByStatus, createBooking, updateBookingStatus, deleteBooking };
