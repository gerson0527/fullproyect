const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Objetivo extends Model {}

Objetivo.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  meta: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  fechaInicio: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fechaFin: {
    type: DataTypes.DATE,
    allowNull: false
  },
  asesorId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Asesores',
      key: 'id'
    }
  },
  estado: {
    type: DataTypes.ENUM('PENDIENTE', 'EN_PROGRESO', 'COMPLETADO', 'CANCELADO'),
    defaultValue: 'PENDIENTE'
  }
}, {
  sequelize,
  modelName: 'Objetivo',
  tableName: 'Objetivos'
});

module.exports = Objetivo;