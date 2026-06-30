const Equipment = require('./Equipment');

class EquipmentMonitoring {
  static CONDITION = Equipment.CONDITION;

  constructor({ id, equipment_id, assistant_id, check_date, condition, notes } = {}) {
    this.id = id ?? null;
    this.equipment_id = equipment_id ?? null;
    this.assistant_id = assistant_id ?? null;
    this.check_date = check_date ?? null;
    this.condition = condition ?? null;
    this.notes = notes ?? null;
  }

  toJSON() {
    return {
      id: this.id,
      equipment_id: this.equipment_id,
      assistant_id: this.assistant_id,
      check_date: this.check_date,
      condition: this.condition,
      notes: this.notes,
    };
  }
}

module.exports = EquipmentMonitoring;
