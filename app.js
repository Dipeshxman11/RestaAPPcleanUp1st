const express = require('express');
const orderController = require('./controllers/orderController');
const database = require('./utils/database');

const app = express();

// Set up database connection
database.sync()
  .then(() => {
    console.log('Database and tables synced!');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

// Use the orderController for all routes related to orders
app.use('/', orderController);


// Start the server
app.listen(4000, () => {
  console.log('Server running on port 4000');
});
