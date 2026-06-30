const CourseSchedule = require('./CourseSchedule');

class AssistantAssignment {
  static DAY = CourseSchedule.DAY;

  static SHIFT = Object.freeze({
    MORNING: 'morning',
    AFTERNOON: 'afternoon',
    EVENING: 'evening',
  });

  constructor({ id, assistant_id, lab_id, day, shift } = {}) {
    this.id = id ?? null;
    this.assistant_id = assistant_id ?? null;
    this.lab_id = lab_id ?? null;
    this.day = day ?? null;
    this.shift = shift ?? null;
  }

  toJSON() {
    return {
      id: this.id,
      assistant_id: this.assistant_id,
      lab_id: this.lab_id,
      day: this.day,
      shift: this.shift,
    };
  }
}

module.exports = AssistantAssignment;
