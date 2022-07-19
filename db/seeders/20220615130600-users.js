'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        nickname: 'admin',
        email: 'admin@mail.ru',
        password: '$2b$10$8zdmcblvYf5jx7Zc7Nf1QO0WT09bYlXMfKWYx1/nEZ38fU6PRuED2',
        role_id: 1,
      },
      {
        nickname: 'tealover',
        email: 'tealover@mail.ru',
        password: '123',
        role_id: 2,
      },
      {
        nickname: 'teaheater',
        email: 'teaheater@mail.ru',
        password: '123',
        role_id: 2,
      },
      {
        nickname: 'nyash_myash',
        email: 'nyash_myash@mail.ru',
        password: '123',
        role_id: 2,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
