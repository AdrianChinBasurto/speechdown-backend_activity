// backend/models/User.js
const mongoose = require('mongoose');

// Definir el esquema del Usuario
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true  // Asegura que el email sea único
  },
  password: {
    type: String,
    required: true  // La contraseña será obligatoria
  },
  role: {
    type: String,
    enum: ['therapist', 'parent'],  // Los roles pueden ser 'therapist' o 'parent'
    required: true
  }
}, { timestamps: true });  // Agrega automáticamente campos createdAt y updatedAt

// Crear el modelo de Usuario
const User = mongoose.model('User', userSchema);

module.exports = User;
