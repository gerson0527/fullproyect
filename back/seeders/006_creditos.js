module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Primero obtenemos algunos IDs existentes
    const clientes = await queryInterface.sequelize.query(
      'SELECT id from Clientes;'
    );
    const asesores = await queryInterface.sequelize.query(
      'SELECT id from Asesores;'
    );
    const bancos = await queryInterface.sequelize.query(
      'SELECT id from bancos;'
    );
    const financieras = await queryInterface.sequelize.query(
      'SELECT id from Financieras;'
    );

    const clienteIds = clientes[0];
    const asesorIds = asesores[0];
    const bancoIds = bancos[0];
    const financieraIds = financieras[0];

    await queryInterface.bulkInsert('Creditos', [
      {
        id: '1',
        clienteId: clienteIds[0].id,
        asesorId: asesorIds[0].id,
        bancoId: bancoIds[0].id,
        financieraId: financieraIds[0].id,
        monto: 15000.00,
        plazo: 24,
        tipo: 'HIPOTECA',
        tasa: 12.5,
        estado: 'PENDIENTE',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        clienteId: clienteIds[1].id,
        asesorId: asesorIds[0].id,
        bancoId: bancoIds[1].id,
        financieraId: financieraIds[1].id,
        monto: 25000.00,
        tipo: 'PRESTAMO PERSONAL',
        plazo: 36,
        tasa: 14.0,
        estado: 'APROBADO',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Creditos', null, {});
  }
};