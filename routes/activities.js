// backend/routes/activities.js
const express = require('express');
const Activity = require('../models/Activity');  // Importamos el modelo Activity
const { verifyToken } = require('../middleware/auth');  // Middleware para verificar el JWT

const router = express.Router();

// Ruta para crear una actividad
router.post('/', verifyToken, async (req, res) => {
  const { content } = req.body;

  try {
    const newActivity = new Activity({
      content
    });

    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creando la actividad' });
  }
});

// Ruta para obtener todas las actividades
router.get('/', verifyToken, async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obteniendo las actividades' });
  }
});

module.exports = router;
