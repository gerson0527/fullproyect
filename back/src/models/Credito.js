const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Credito = sequelize.define('Credito', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  clienteId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  asesorId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  financieraId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bancoid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  tasa: {
    type: DataTypes.STRING,
    allowNull: false
  },
  plazo: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  garantia: {
    type: DataTypes.STRING
  },
  estado: {
    type: DataTypes.ENUM(
      'Pendiente',
      'En Revisión',
      'Aprobado',
      'Desembolsado',
      'Activo',
      'Rechazado',
      'Documentos Pendientes'
    ),
    defaultValue: 'Pendiente'
  },
  fechaSolicitud: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  fechaAprobacion: {
    type: DataTypes.DATE
  },
  fechaVencimiento: {
    type: DataTypes.DATE
  },
  observaciones: {
    type: DataTypes.TEXT
  }
});

module.exports = Credito;