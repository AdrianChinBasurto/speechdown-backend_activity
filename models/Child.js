// backend/models/Child.js
const mongoose = require('mongoose');

// Definir el esquema del Niño
const childSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  progress: {
    type: String,  // Puedes usar otro tipo de dato según el progreso (ej. un objeto o un número)
    required: false
  },
  activities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity'  // Relaciona las actividades con el modelo de Activity
  }]
}, { timestamps: true });  // Agrega automáticamente campos createdAt y updatedAt

// Crear el modelo de Niño
const Child = mongoose.model('Child', childSchema);

module.exports = Child;
