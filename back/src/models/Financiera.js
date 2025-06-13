const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

class Financiera extends Model {}

Financiera.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  especializacion: {
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
  tasaPromedio: {
    type: DataTypes.DECIMAL(5, 2)
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  sequelize,
  modelName: 'Financiera',
  tableName: 'Financieras'
});

module.exports = Financiera;