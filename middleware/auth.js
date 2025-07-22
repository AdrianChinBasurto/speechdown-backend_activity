// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Guardamos la información del usuario en la petición
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token no válido' });
  }
};

module.exports = { verifyToken };
