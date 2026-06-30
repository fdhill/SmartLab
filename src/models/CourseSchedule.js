class CourseSchedule {
  static DAY = Object.freeze({
    MONDAY: 'monday',
    TUESDAY: 'tuesday',
    WEDNESDAY: 'wednesday',
    THURSDAY: 'thursday',
    FRIDAY: 'friday',
    SATURDAY: 'saturday',
  });

  constructor({ id, lab_id, course_id, lecturer_id, day, start_time, end_time, class: className, semester } = {}) {
    this.id = id ?? null;
    this.lab_id = lab_id ?? null;
    this.course_id = course_id ?? null;
    this.lecturer_id = lecturer_id ?? null;
    this.day = day ?? null;
    this.start_time = start_time ?? null;
    this.end_time = end_time ?? null;
    this.class = className ?? null;
    this.semester = semester ?? null;
  }

  toJSON() {
    return {
      id: this.id,
      lab_id: this.lab_id,
      course_id: this.course_id,
      lecturer_id: this.lecturer_id,
      day: this.day,
      start_time: this.start_time,
      end_time: this.end_time,
      class: this.class,
      semester: this.semester,
    };
  }
}

module.exports = CourseSchedule;
