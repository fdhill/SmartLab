class Course {
  constructor({ id, code, name, credits } = {}) {
    this.id = id ?? null;
    this.code = code ?? null;
    this.name = name ?? null;
    this.credits = credits ?? null;
  }

  toJSON() {
    return {
      id: this.id,
      code: this.code,
      name: this.name,
      credits: this.credits,
    };
  }
}

module.exports = Course;
