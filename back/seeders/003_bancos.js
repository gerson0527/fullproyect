module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Bancos', [
      {
        nombre: 'Banco de Crédito del Perú',
        tipo: 'Banca múltiple',
        personaContacto: 'Juan Pérez',
        telefono: '987654321',
        email: 'contacto@bcp.com.pe',
        tasaBase: 8.50,
        direccion: 'Av. República de Panamá 3055, San Isidro',
        estado: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'BBVA',
        tipo: 'Banca múltiple',
        personaContacto: 'María López',
        telefono: '912345678',
        email: 'contacto@bbva.com.pe',
        tasaBase: 8.75,
        direccion: 'Av. República de Panamá 3055, San Isidro',
        estado: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Interbank',
        tipo: 'Banca múltiple',
        personaContacto: 'Carlos Gómez',
        telefono: '923456789',
        email: 'contacto@interbank.com.pe',
        tasaBase: 9.00,
        direccion: 'Calle Centenario 156, La Molina',
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