module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('Asesores', [
      {
        nombre: 'Ana Rodríguez',
        cargo: 'Asesora Senior',
        email: 'ana.rodriguez@creditpro.com',
        telefono: '+1 234 567 8900',
        sucursal: 'Principal',
        creditos: 23,
        tasaAprobacion: 85,
        rendimiento: 'Alto',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Carlos Mendoza',
        cargo: 'Asesor Senior',
        email: 'carlos.mendoza@creditpro.com',
        telefono: '+1 234 567 8903',
        sucursal: 'Centro',
        creditos: 21,
        tasaAprobacion: 82,
        rendimiento: 'Alto',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Asesores', null, {});
  }
};