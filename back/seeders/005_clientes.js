module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Clientes', [
      {
        nombre: 'Juan Carlos',
        apellido: 'Pérez Torres',
        dni: '12345678',
        email: 'juan.perez@email.com',
        telefono: '987654321',
        direccion: 'Avenida Principal 123',
        fechanacimiento: new Date('1985-05-15'),
        ingresosMensuales: 3500.00,
        creditosActivos: 2,
        estado: 'Activo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'María Elena',
        apellido: 'García Sánchez',
        email: 'maria.lopez@email.com',
        telefono: '912345678',
        dni: '87654321',
        direccion: 'Calle Mayor 456',
        fechanacimiento: new Date('1990-08-22'),
        creditosActivos: 1,
        ingresosMensuales: 4200.00,
        estado: 'Activo',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Clientes', null, {});
  }
};