class User {
  static ROLE = Object.freeze({
    ADMIN: 'admin',
    LECTURER: 'lecturer',
    STUDENT: 'student',
    ASSISTANT: 'assistant',
  });

  constructor({ id, name, email, password, role, phone_number } = {}) {
    this.id = id ?? null;
    this.name = name ?? null;
    this.email = email ?? null;
    this.password = password ?? null;
    this.role = role ?? null;
    this.phone_number = phone_number ?? null;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      phone_number: this.phone_number,
    };
  }
}

module.exports = User;
