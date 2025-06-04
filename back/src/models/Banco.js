const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

class Banco extends Model {}

Banco.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING
  },
  personaContacto: {
    type: DataTypes.STRING
  },
  telefono: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  tasaBase: {
    type: DataTypes.DECIMAL(5, 2)
  },
  direccion: {
    type: DataTypes.TEXT
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  sequelize,
  modelName: 'Banco',
  tableName: 'Bancos'
});

module.exports = Banco;