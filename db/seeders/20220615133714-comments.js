'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', [
      {
        user_id: 2,
        product_id: 1,
        text: 'Лучший чай, который я пила',
      },
      {
        user_id: 3,
        product_id: 1,
        text: 'Отвратительный чай, пейте кофе',
      },
      {
        user_id: 4,
        product_id: 1,
        text: 'А я че? Я ниче...',
      },
      {
        user_id: 1,
        product_id: 1,
        text: 'Я люблю гонять чаи',
      },
      {
        user_id: 3,
        product_id: 1,
        text: 'И вообще лучший чай это, когда вместо чая водка',
      },
      {
        user_id: 2,
        product_id: 2,
        text: 'Лучший чай, который я пила',
      },
      {
        user_id: 3,
        product_id: 2,
        text: 'Отвратительный чай, пейте кофе',
      },
      {
        user_id: 4,
        product_id: 2,
        text: 'А я че? Я ниче...',
      },
      {
        user_id: 1,
        product_id: 2,
        text: 'Я люблю гонять чаи',
      },
      {
        user_id: 3,
        product_id: 2,
        text: 'И вообще лучший чай это, когда вместо чая водка',
      },
      {
        user_id: 2,
        product_id: 3,
        text: 'Лучший чай, который я пила',
      },
      {
        user_id: 3,
        product_id: 3,
        text: 'Отвратительный чай, пейте кофе',
      },
      {
        user_id: 4,
        product_id: 3,
        text: 'А я че? Я ниче...',
      },
      {
        user_id: 1,
        product_id: 3,
        text: 'Я люблю гонять чаи',
      },
      {
        user_id: 3,
        product_id: 3,
        text: 'И вообще лучший чай это, когда вместо чая водка',
      },
      {
        user_id: 2,
        product_id: 4,
        text: 'Лучший чай, который я пила',
      },
      {
        user_id: 3,
        product_id: 4,
        text: 'Отвратительный чай, пейте кофе',
      },
      {
        user_id: 4,
        product_id: 4,
        text: 'А я че? Я ниче...',
      },
      {
        user_id: 1,
        product_id: 4,
        text: 'Я люблю гонять чаи',
      },
      {
        user_id: 3,
        product_id: 4,
        text: 'И вообще лучший чай это, когда вместо чая водка',
      },
      {
        user_id: 2,
        product_id: 5,
        text: 'Лучший чай, который я пила',
      },
      {
        user_id: 3,
        product_id: 5,
        text: 'Отвратительный чай, пейте кофе',
      },
      {
        user_id: 4,
        product_id: 5,
        text: 'А я че? Я ниче...',
      },
      {
        user_id: 1,
        product_id: 5,
        text: 'Я люблю гонять чаи',
      },
      {
        user_id: 3,
        product_id: 5,
        text: 'И вообще лучший чай это, когда вместо чая водка',
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
