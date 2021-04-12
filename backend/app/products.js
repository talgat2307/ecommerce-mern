const router = require('express').Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const upload = require('../middleware/upload');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.send(product);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post('/', [auth, permit('admin'), upload.single('image')], async (req, res) => {
  try {
    const product = new Product({
      user: req.user._id,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      brand: req.body.brand,
      category: req.body.category,
      countInStock: req.body.countInStock,
      numReviews: req.body.numReviews,
    });

    if (req.file) product.image = req.file.filename;

    await product.save();
    res.send(product);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.put('/:id', [auth, permit('admin'), upload.single('image')], async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name || product.name;
      product.price = req.body.price || product.price;
      product.description = req.body.description || product.description;
      product.brand = req.body.brand || product.brand;
      product.category = req.body.category || product.category;
      product.countInStock = req.body.countInStock || product.countInStock;
    }
    if (req.file) product.image = req.file.filename || product.image;

    const updatedProduct = await product.save();

    res.send(updatedProduct);
  } catch (e) {
    res.status(404).send({ error: 'Product not found' });
  }
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    await product.remove();
    res.send({ message: 'Product removed' });
  } catch (e) {
    res.status(400).send({ error: 'Product not found' });
  }
});

module.exports = router;