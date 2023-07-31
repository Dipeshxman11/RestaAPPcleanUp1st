const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'restaurant_order_app2',
   'root', 
   '0987654321', 
{
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
