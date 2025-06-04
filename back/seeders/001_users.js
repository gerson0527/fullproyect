const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => {
    const password = await bcrypt.hash('admin123', 10);
    return queryInterface.bulkInsert('Users', [{
      username: 'admin',
      password: password,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};