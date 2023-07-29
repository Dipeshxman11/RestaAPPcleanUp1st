// orderRouter.js
const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/orderController');

orderRouter.use(express.static("public"));

orderRouter.get("/", orderController.getMainPage);
orderRouter.post('/order', orderController.submitOrder);
orderRouter.delete('/order/:orderId', orderController.deleteOrder);
orderRouter.get('/orders', orderController.fetchOrders);

module.exports = orderRouter;
