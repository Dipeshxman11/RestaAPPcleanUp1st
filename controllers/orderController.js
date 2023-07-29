const express = require('express');
const bodyParser = require('body-parser');
const Order = require('../models/orderModel');

const app = express();

app.use(bodyParser.json());

// Serve the frontend
app.use(express.static('public'));

// Save order to the database
app.post('/order', async (req, res) => {
  const { menu, price, tableNo } = req.body;

  try {
    const order = await Order.create({ menu, price, tableNo });
    res.json({ message: 'Order saved successfully', order });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ error: 'Error saving order' });
  }
});

// Delete order from the database
app.delete('/order/:orderId', async (req, res) => {
  const orderId = req.params.orderId;

  try {
    await Order.destroy({ where: { id: orderId } });
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Error deleting order' });
  }
});

// Get orders from the database
app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({ error: 'Error retrieving orders' });
  }
});

module.exports = app;




