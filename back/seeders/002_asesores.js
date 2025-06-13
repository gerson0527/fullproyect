module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert('Asesor', [
        {
          nombre: 'Carlos Mendoza',
          cargo: 'Asesor Senior',
          email: 'carlos.mendoza@email.com', // Asegúrate que sea único
          telefono: '987654321',
          sucursal: 'Lima Centro',
          experienciaPrev: '5 años en banca comercial',
          fechaIngreso: new Date('2020-01-15'),
          creditos: 25, // Asegúrate que sea entero
          tasaAprobacion: 85.5,
          rendimiento: 'Alto', // Exactamente como está en el ENUM
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nombre: 'Ana Torres',
          cargo: 'Asesor Junior',
          email: 'ana.torres@email.com', // Diferente al anterior
          telefono: '912345678',
          sucursal: 'Lima Norte',
          experienciaPrev: '2 años en ventas',
          fechaIngreso: new Date('2022-05-10'),
          creditos: 10, // Asegúrate que sea entero
          tasaAprobacion: 70.0,
          rendimiento: 'Medio', // Exactamente como está en el ENUM
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
    } catch (error) {
      console.error('Error in Asesores seeder:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Asesor', {
      email: {
        [Sequelize.Op.in]: [
          'carlos.mendoza@email.com',
          'ana.torres@email.com'
        ]
      }
    }, {});
  }
};