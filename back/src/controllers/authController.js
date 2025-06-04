const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Aquí iría la validación del usuario y contraseña
    // Por ahora simulamos la autenticación como en el frontend
    
    const token = jwt.sign(
      { username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: { username }
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Credenciales incorrectas'
    });
  }
};