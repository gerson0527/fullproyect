const request = require('supertest');
const app = require('../src/app'); // Ya no uses index.js aquí

test.only('debería responder con frases motivacionales', async () => {
  const res = await request(app).get('/api/frases-motivacion');
  expect(res.statusCode).toBe(200);
  // Puedes añadir más validaciones si quieres verificar contenido:
  expect(Array.isArray(res.body)).toBe(true);
});
