const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const connectDB = require('./db');
const users = require('./app/users');
const products = require('./app/products');
const orders = require('./app/orders');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

connectDB();

app.use('/users', users);
app.use('/products', products);
app.use('/orders', orders);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.inverse));