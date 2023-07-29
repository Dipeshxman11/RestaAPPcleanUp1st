const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

const Order = sequelize.define('Order', {
  menu: {
    type: Sequelize .STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize .FLOAT,
    allowNull: false,
  },
  tableNo: {
    type: Sequelize .INTEGER,
    allowNull: false,
  },
});

module.exports = Order;
