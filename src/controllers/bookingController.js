const bookingService = require('../services/bookingService');
const bookingRepository = require('../repositories/bookingRepository');

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
      // asisten: hanya booking pada lab yang ditugaskan (read-only)
      bookings = await bookingRepository.findByLabIds(req.assignedLabIds);
    }
    res.json({ success: true, data: bookings });
  } catch (err) {
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const booking = await bookingService.getBookingById(Number(req.params.id));
    if (req.user.role === 'assistant' && !req.assignedLabIds.includes(booking.lab_id)) {
      return res.status(403).json({ success: false, message: 'Access denied to this booking' });
    }
    res.json({ success: true, data: booking });
  } catch (err) {
    next(err);
  }
}

async function store(req, res, next) {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(201).json({ success: true, data: booking });
  } catch (err) {
    next(err);
  }
}

async function updateStatus(req, res, next) {
  try {
    const booking = await bookingService.updateBookingStatus(Number(req.params.id), req.body.status);
    res.json({ success: true, data: booking });
  } catch (err) {
    next(err);
  }
}

async function destroy(req, res, next) {
  try {
    await bookingService.deleteBooking(Number(req.params.id));
    res.json({ success: true, message: 'Booking deleted successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = { index, show, store, updateStatus, destroy };
