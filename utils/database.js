const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('restaurant_order_app2', 'root', '0987654321', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
