const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");

// const cors = require('cors')
const app = express();
const sequelize = require('./utils/database');

// app.use(cors());

const orderRouter = require("./routes/order");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use the orderRouter for all routes related to orders
app.use("/get", orderRouter);
app.use("/post", orderRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public","index.html"));
});

// Set up database connection
sequelize
  .sync()
  .then(() => {
    app.listen(4000);
    console.log('Database and tables synced!');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });
