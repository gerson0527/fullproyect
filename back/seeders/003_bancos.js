module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Bancos', [
      {
        nombre: 'Banco de Crédito del Perú',
        codigo: 'BCP',
        estado: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'BBVA',
        codigo: 'BBVA',
        estado: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Interbank',
        codigo: 'IBK',
        estado: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Bancos', null, {});
  }
};