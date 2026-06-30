class Equipment {
  static CONDITION = Object.freeze({
    GOOD: 'good',
    MINOR_DAMAGE: 'minor_damage',
    MAJOR_DAMAGE: 'major_damage',
  });

  constructor({ id, lab_id, name, code, quantity, condition } = {}) {
    this.id = id ?? null;
    this.lab_id = lab_id ?? null;
    this.name = name ?? null;
    this.code = code ?? null;
    this.quantity = quantity ?? null;
    this.condition = condition ?? null;
  }

  toJSON() {
    return {
      id: this.id,
      lab_id: this.lab_id,
      name: this.name,
      code: this.code,
      quantity: this.quantity,
      condition: this.condition,
    };
  }
}

module.exports = Equipment;
