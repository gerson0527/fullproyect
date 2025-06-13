module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Financieras', [
      {
        nombre: 'Crediscotia',
        especializacion: 'Préstamos personales',
        personaContacto: 'Roberto Sánchez',
        telefono: '987654321',
        email: 'contacto@crediscotia.com.pe',
        tasaPromedio: 15.50,
        descripcion: 'Financiera especializada en créditos de consumo',
        estado: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'MiBanco',
        especializacion: 'Microcréditos',
        personaContacto: 'Lucía Fernández',
        telefono: '912345678',
        email: 'contacto@mibanco.com.pe',
        tasaPromedio: 18.00,
        descripcion: 'Financiera enfocada en inclusión financiera',
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