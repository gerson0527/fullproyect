module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Obtener IDs existentes de tablas relacionadas
    const [clientes] = await queryInterface.sequelize.query(
      'SELECT id FROM Clientes;'
    );
    const [asesores] = await queryInterface.sequelize.query(
      'SELECT id FROM Asesores;'
    );
    const [bancos] = await queryInterface.sequelize.query(
      'SELECT id FROM Bancos;'
    );
    const [financieras] = await queryInterface.sequelize.query(
      'SELECT id FROM Financieras;'
    );

    // Verificar que existen registros en las tablas relacionadas
    if (!clientes.length || !asesores.length || !bancos.length || !financieras.length) {
      throw new Error('No se encontraron registros en las tablas relacionadas');
    }

    // Usar los primeros IDs encontrados (o lógica más compleja según necesites)
    await queryInterface.bulkInsert('Creditos', [
      {
        id: 'CRD-20230001',
        clienteId: clientes[0].id,
        asesorId: asesores[0].id,
        financieraId: financieras[0].id,
        bancoId: bancos[0].id,
        monto: 15000.00,
        tasa: '15.5%',
        plazo: 24,
        tipo: 'Personal',
        garantia: 'Ninguna',
        estado: 'Aprobado',
        fechaSolicitud: new Date('2023-01-10'),
        fechaAprobacion: new Date('2023-01-15'),
        fechaVencimiento: new Date('2025-01-15'),
        observaciones: 'Cliente con buen historial crediticio',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'CRD-20230002',
        clienteId: clientes[1 % clientes.length].id, // Usa módulo para evitar out of bounds
        asesorId: asesores[1 % asesores.length].id,
        financieraId: financieras[1 % financieras.length].id,
        bancoId: bancos[1 % bancos.length].id,
        monto: 25000.00,
        tasa: '18.0%',
        plazo: 36,
        tipo: 'Hipotecario',
        garantia: 'Propiedad',
        estado: 'En Revisión',
        fechaSolicitud: new Date('2023-02-05'),
        observaciones: 'Documentación pendiente de verificación',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Creditos', {
      id: {
        [Sequelize.Op.in]: ['CRD-20230001', 'CRD-20230002']
      }
    }, {});
  }
};