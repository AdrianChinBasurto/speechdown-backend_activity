// backend/routes/children.js
const express = require('express');
const Child = require('../models/Child');  // Importamos el modelo Child
const { verifyToken } = require('../middleware/auth');  // Middleware para verificar el JWT

const router = express.Router();

// Ruta para crear un perfil de niño
router.post('/', verifyToken, async (req, res) => {
  const { name, age } = req.body;

  try {
    const newChild = new Child({
      name,
      age
    });

    await newChild.save();
    res.status(201).json(newChild);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creando el perfil del niño' });
  }
});

// Ruta para obtener todos los niños
router.get('/', verifyToken, async (req, res) => {
  try {
    const children = await Child.find();
    res.json(children);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obteniendo los niños' });
  }
});

module.exports = router;
