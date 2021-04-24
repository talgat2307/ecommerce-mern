const router = require('express').Router();
const Product = require('../models/Product');
const auth = require('../middlewares/auth');
const permit = require('../middlewares/permit');
const upload = require('../middlewares/upload');

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  try {
    const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(limit).skip(limit * (page - 1)).exec();
    res.send({ products, pages: Math.ceil(count / limit) });
  } catch (e) {
    res.status(404).send(e);
  }
});

router.get('/top-rated', async (req, res) => {
  try {
    const products = await Product.find().sort({ rating: -1}).limit(4);
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

router.post('/:id/reviews', [auth], async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const alreadyReviewed = product.reviews.find(reviewed => reviewed.user.toString() === req.user._id.toString());

    if (alreadyReviewed) {
      res.status(400).send({ error: 'Product already reviewed' });
    } else {
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;

      product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

      await product.save();
      res.send({ message: 'Review added' });
    }
  } catch (e) {
    res.status(400).send(e);
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

router.delete('/:id/reviews', [auth, permit('user', 'admin')], async (req, res) => {
  try {
    let query;
    if (req.query.review) query = { review: req.query.review };
    await Product.updateOne({ _id: req.params.id }, { '$pull': { 'reviews': { '_id': query.review } } });
    res.send({ message: 'Review has been successfully deleted' });
  } catch (e) {
    res.status(400).send({ error: 'Product not found' });
  }
});

module.exports = router;