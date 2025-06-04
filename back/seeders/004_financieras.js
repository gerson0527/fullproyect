module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Financieras', [
      {
        nombre: 'Caja Arequipa',
        codigo: 'CAREQUIPA',
        estado: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Caja Huancayo',
        codigo: 'CHUANCAYO',
        estado: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Financiera Confianza',
        codigo: 'FCONFIANZA',
        estado: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Financieras', null, {});
  }
};