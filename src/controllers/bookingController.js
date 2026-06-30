const bookingService = require('../services/bookingService');
const bookingRepository = require('../repositories/bookingRepository');
const { ok, created, fail } = require('../utils/response');

async function index(req, res, next) {
  try {
    let bookings;
    if (req.user.role === 'admin') {
      const { user_id, status } = req.query;
      if (user_id) {
        bookings = await bookingService.getBookingsByUser(Number(user_id));
      } else if (status) {
        bookings = await bookingService.getBookingsByStatus(status);
      } else {
        bookings = await bookingService.getAllBookings();
      }
    } else {
      bookings = await bookingRepository.findByLabIds(req.assignedLabIds);
    }
    ok(res, bookings, 'Bookings retrieved successfully');
  } catch (err) {
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const booking = await bookingService.getBookingById(Number(req.params.id));
    if (req.user.role === 'assistant' && !req.assignedLabIds.includes(booking.lab_id)) {
      return fail(res, 'Access denied to this booking', 403);
    }
    ok(res, booking, 'Booking retrieved successfully');
  } catch (err) {
    next(err);
  }
}

async function store(req, res, next) {
  try {
    const booking = await bookingService.createBooking(req.body);
    created(res, booking, 'Booking created successfully');
  } catch (err) {
    next(err);
  }
}

async function updateStatus(req, res, next) {
  try {
    const booking = await bookingService.updateBookingStatus(Number(req.params.id), req.body.status);
    ok(res, booking, 'Booking status updated successfully');
  } catch (err) {
    next(err);
  }
}

async function destroy(req, res, next) {
  try {
    await bookingService.deleteBooking(Number(req.params.id));
    ok(res, null, 'Booking deleted successfully');
  } catch (err) {
    next(err);
  }
}

module.exports = { index, show, store, updateStatus, destroy };
