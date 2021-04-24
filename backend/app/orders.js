const router = require('express').Router();
const Order = require('../models/Order');
const auth = require('../middlewares/auth');
const permit = require('../middlewares/permit');

router.get('/', [auth], async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.get('/list', [auth, permit('admin')], async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'id name');
    res.send(orders);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.get('/:id', [auth], async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    res.send(order);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.post('/', [auth], async (req, res) => {
    try {
      if (req.body.orderItems && req.body.orderItems.length === 0) {
        res.status(400).send({ error: 'No order items' });
      } else {
        const order = new Order({
          user: req.user._id,
          orderItems: req.body.orderItems,
          shippingAddress: req.body.shippingAddress,
          paymentMethod: req.body.paymentMethod,
          itemsPrice: req.body.itemsPrice,
          shippingPrice: req.body.shippingPrice,
          totalPrice: req.body.totalPrice,
        });

        const createdOrder = await order.save();
        res.send(createdOrder);
      }
    } catch (e) {
      res.status(400).send(e);
    }
  },
);

router.put('/:id/delivered', [auth, permit('admin')], async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.isPaid = true;
      order.deliveredAt = Date.now();
      order.paidAt = Date.now();
    }

    const updatedOrder = await order.save();
    res.send(updatedOrder);
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = router;
