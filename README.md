# its_5_oclock

1) Создайте файл .env и пропишите все параметры из env-example

2) Создайте файл .sequelizerc и вставьте туда этот код: 

const path = require('path');
module.exports = {
  'config': path.resolve('db', 'database.js'),
  'models-path': path.resolve('db', 'models'),
  'seeders-path': path.resolve('db', 'seeders'),
  'migrations-path': path.resolve('db', 'migrations')
};

3) npm i

4) npx sequelize-cli db:migrate

5) npx sequelize-cli db:seed:all

6) npm start 

7) Enjoy =)
