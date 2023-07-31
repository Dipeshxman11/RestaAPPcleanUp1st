// orderRouter.js
const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/order');

orderRouter.use(express.static("public"));

orderRouter.get("/", orderController.getMainPage);
orderRouter.post('/orders', orderController.submitOrder);
orderRouter.delete('/orders/:id', orderController.deleteOrder);
orderRouter.get('/orders', orderController.fetchOrders);

module.exports = orderRouter;
