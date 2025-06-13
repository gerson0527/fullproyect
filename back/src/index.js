const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
require('dotenv').config();
const frases = require('./frases');

const app = express();

// Importar rutas
const authRoutes = require('./routes/authRoutes'); 
const clienteRoutes = require('./routes/clienteRoutes');
const asesorRoutes = require('./routes/asesorRoutes');
const bancoRoutes = require('./routes/bancoRoutes');
const financieraRoutes = require('./routes/financieraRoutes');
const creditoRoutes = require('./routes/creditoRoutes');

// Middleware
// Configuración específica para desarrollo
const corsOptions = {
  origin: 'http://localhost:5173', // Asegúrate que coincide con tu frontend
  credentials: true, // Permite el envío de cookies
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
};
app.use(cors(corsOptions));
// Manejo explícito de OPTIONS para preflight
//app.options('*', cors(corsOptions));
app.use(cookieParser());
app.use(helmet());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/asesores', asesorRoutes);
app.use('/api/bancos', bancoRoutes);
app.use('/api/financieras', financieraRoutes);
app.use('/api/creditos', creditoRoutes);
app.use('/api/frases-motivacion', async (req, res) => {
  try {
    res.json(frases);
    
  } catch (error) {
    console.error('Error al obtener frases:', error);
    res.status(500).json({ error: 'Error al obtener frases motivacionales' });
  }
});
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});