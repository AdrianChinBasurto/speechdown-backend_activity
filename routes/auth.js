// backend/routes/auth.js
const express = require('express');
const User = require('../models/User');  // Importamos el modelo User
const bcrypt = require('bcryptjs');  // Para encriptar las contraseñas
const jwt = require('jsonwebtoken');  // Para manejar la autenticación JWT

const router = express.Router();

// Ruta para registro de usuarios (terapeutas y padres)
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  
  try {
    // Verificamos si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: 'Usuario ya existe' });

    // Encriptamos la contraseña antes de guardarla
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creamos el nuevo usuario
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();

    // Generamos un JWT para autenticar al usuario
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error registrando el usuario' });
  }
});

// Ruta para login de usuarios
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificamos si el usuario existe
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    // Verificamos la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Contraseña incorrecta' });

    // Generamos el token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error durante el login' });
  }
});

module.exports = router;
