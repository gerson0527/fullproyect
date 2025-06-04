const Cliente = require('./Cliente');
const Asesor = require('./Asesor');
const Credito = require('./Credito');
const Banco = require('./Banco');
const Financiera = require('./Financiera');

// Relaciones
Credito.belongsTo(Cliente);
Cliente.hasMany(Credito);

Credito.belongsTo(Asesor);
Asesor.hasMany(Credito);

Credito.belongsTo(Banco);
Banco.hasMany(Credito);

Credito.belongsTo(Financiera);
Financiera.hasMany(Credito);

module.exports = {
  Cliente,
  Asesor,
  Credito,
  Banco,
  Financiera
};