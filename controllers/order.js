const path = require("path");
const Order = require('../models/order');


exports.getMainPage = (_req, res, next) => {
    res.sendFile(path.join(__dirname, "../", "public", "index.html"));
  };


  exports.submitOrder = async (req, res) => {
    const { menu, price, tableNo } = req.body;
  
    try {
      if (isNaN(parseFloat(price))) {
        return res.status(400).json({ error: 'Please enter a valid price.' });
      }
  
      const order = await Order.create({ menu, price, tableNo });
      return res.json({ message: 'Order saved successfully', order });
    } catch (error) {
      console.error('Error saving order:', error);
      return res.status(500).json({ error: 'Error saving order' });
    }
  };  

exports.deleteOrder = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const deletedOrder = await Order.destroy({ where: { id: orderId } });
    if (deletedOrder === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    return res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    return res.status(500).json({ error: 'Error deleting order' });
  }
};

exports.fetchOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    return res.json(orders);
  } catch (error) {
    console.error('Error retrieving orders:', error);
    return res.status(500).json({ error: 'Error retrieving orders' });
  }
};