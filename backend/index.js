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

app.listen(8000, () => console.log('Server started'.yellow.inverse));