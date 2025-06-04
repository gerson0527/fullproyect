module.exports = {
  up: async (queryInterface, Sequelize) => {
    const asesores = await queryInterface.sequelize.query(
      'SELECT id from Asesores;'
    );
    const asesorIds = asesores[0];

    await queryInterface.bulkInsert('Objetivos', [
      {
        nombre: 'Meta de Ventas Q1',
        descripcion: 'Alcanzar meta de ventas del primer trimestre',
        meta: 100000.00,
        fechaInicio: new Date('2024-01-01'),
        fechaFin: new Date('2024-03-31'),
        asesorId: asesorIds[0].id,
        estado: 'EN_PROGRESO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Meta de Clientes Nuevos',
        descripcion: 'Captar nuevos clientes para créditos personales',
        meta: 50000.00,
        fechaInicio: new Date('2024-01-01'),
        fechaFin: new Date('2024-06-30'),
        asesorId: asesorIds[0].id,
        estado: 'PENDIENTE',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Objetivos', null, {});
  }
};