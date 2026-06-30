class Lab {
  static STATUS = Object.freeze({
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    MAINTENANCE: 'maintenance',
  });

  constructor({ id, name, location, capacity, status } = {}) {
    this.id = id ?? null;
    this.name = name ?? null;
    this.location = location ?? null;
    this.capacity = capacity ?? null;
    this.status = status ?? null;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      location: this.location,
      capacity: this.capacity,
      status: this.status,
    };
  }
}

module.exports = Lab;
