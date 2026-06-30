class LabAssistant {
  constructor({ id, user_id, student_id, period } = {}) {
    this.id = id ?? null;
    this.user_id = user_id ?? null;
    this.student_id = student_id ?? null;
    this.period = period ?? null;
  }

  toJSON() {
    return {
      id: this.id,
      user_id: this.user_id,
      student_id: this.student_id,
      period: this.period,
    };
  }
}

module.exports = LabAssistant;
