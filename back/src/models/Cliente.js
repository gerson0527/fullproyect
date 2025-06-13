const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Cliente = sequelize.define('Cliente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  telefono: {
    type: DataTypes.STRING
  },
  direccion: {
    type: DataTypes.STRING
  },  
  fechanacimiento: {
    type: DataTypes.DATE
  },
  ingresosMensuales: {
    type: DataTypes.DECIMAL(10, 2)
  },
  estado: {
    type: DataTypes.ENUM('Activo', 'Pendiente', 'Inactivo'),
    defaultValue: 'Activo'
  }
});

module.exports = Cliente;