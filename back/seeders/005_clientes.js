module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Clientes', [
      {
        nombre: 'Juan Carlos',
        apellido: 'Pérez García',
        dni: '45678912',
        telefono: '987654321',
        email: 'juan.perez@email.com',
        estado: 'ACTIVO',
        direccion: 'Avenida Principal 123',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'María Elena',
        apellido: 'López Torres',
        dni: '23456789',
        telefono: '912345678',
        email: 'maria.lopez@email.com',
        estado: 'PENDIENTE',
        direccion: 'Calle Mayor 123',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Clientes', null, {});
  }
};