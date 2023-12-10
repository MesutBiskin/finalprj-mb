const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const authController = require('./controllers/authConrroller');
const productController = require('./controllers/productController');
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Event handlers for MongoDB connection
const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('DB connection established');

  // Start the server after the database connection is established
  app.listen(process.env.PORT, () => {
    console.log('Server has been connected successfully');
  });
});

// Middleware
app.use(cors());

// Routes and other middleware configurations go here
// those two middlewares make req.body accessible, otherwise it would be undefined!!!!!!!!
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use('/auth', authController)
app.use('/product', productController)

// Example route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

//server is on port 8080,client is on port 3000, 
//we are going to get a cors ERROR response!, but cors() removes thar error