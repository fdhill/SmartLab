class Booking {
  static ACTIVITY_TYPE = Object.freeze({
    PRACTICUM: 'practicum',
    RESEARCH: 'research',
    SEMINAR: 'seminar',
    OTHER: 'other',
  });

  static STATUS = Object.freeze({
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    COMPLETED: 'completed',
  });

  constructor({ id, lab_id, user_id, date, start_time, end_time, activity_type, purpose, status } = {}) {
    this.id = id ?? null;
    this.lab_id = lab_id ?? null;
    this.user_id = user_id ?? null;
    this.date = date ?? null;
    this.start_time = start_time ?? null;
    this.end_time = end_time ?? null;
    this.activity_type = activity_type ?? null;
    this.purpose = purpose ?? null;
    this.status = status ?? null;
  }

  toJSON() {
    return {
      id: this.id,
      lab_id: this.lab_id,
      user_id: this.user_id,
      date: this.date,
      start_time: this.start_time,
      end_time: this.end_time,
      activity_type: this.activity_type,
      purpose: this.purpose,
      status: this.status,
    };
  }
}

module.exports = Booking;
