'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Verificar si ya existen asesores
    const [asesores] = await queryInterface.sequelize.query(
      'SELECT id FROM Asesores LIMIT 2;'
    );

    if (asesores.length < 2) {
      throw new Error('Se necesitan al menos 2 asesores para crear los objetivos');
    }

    await queryInterface.bulkInsert('Objetivos', [
      {
        titulo: 'Ventas Q1',
        tipo: 'VENTAS',
        unidad: 'USD',
        descripcion: 'Meta de ventas para el primer trimestre',
        meta: 50000.00,
        fechaInicio: new Date('2023-01-01'),
        fechaFin: new Date('2023-03-31'),
        asesorId: asesores[0].id,
        prioridad: 'ALTA',
        estado: 'COMPLETADO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Nuevos clientes Q2',
        tipo: 'CAPTACION',
        unidad: 'Clientes',
        descripcion: 'Captación de nuevos clientes',
        meta: 20.00,
        fechaInicio: new Date('2023-04-01'),
        fechaFin: new Date('2023-06-30'),
        asesorId: asesores[1].id,
        prioridad: 'MEDIA',
        estado: 'EN_PROGRESO',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Objetivos', {
      titulo: {
        [Sequelize.Op.in]: ['Ventas Q1', 'Nuevos clientes Q2']
      }
    }, {});
  }
};