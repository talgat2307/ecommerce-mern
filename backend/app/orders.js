const router = require('express').Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

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

router.get('/:id', [auth], async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    res.send(order);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.get('/', [auth], async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = router;
