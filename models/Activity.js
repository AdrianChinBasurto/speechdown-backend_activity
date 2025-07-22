// backend/models/Activity.js
const mongoose = require('mongoose');

// Definir el esquema de Actividad
const activitySchema = new mongoose.Schema({
  content: {
    type: String,
    required: true  // El contenido de la actividad generada
  },
  generatedAt: {
    type: Date,
    default: Date.now  // Fecha de creación de la actividad
  }
}, { timestamps: true });  // Agrega automáticamente campos createdAt y updatedAt

// Crear el modelo de Actividad
const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
