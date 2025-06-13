// test/setup.js

// Limpieza automática antes de cada test (si usas una base de datos en memoria, por ejemplo)
beforeEach(async () => {
    // await db.clear(); // <-- solo si tienes un helper para limpiar datos
  });
  
  // Limpieza después de cada test (útil para cerrar conexiones o restaurar mocks)
  afterEach(() => {
    jest.clearAllMocks(); // limpia cualquier mock
  });
  
  // Puedes agregar globales si lo deseas
  // Por ejemplo, si quieres evitar importar `request` en cada test:
  
  // const supertest = require('supertest');
  // const app = require('../src/app'); // Ajusta según tu estructura
  // global.request = supertest(app);
  