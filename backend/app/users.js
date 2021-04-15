const router = require('express').Router();
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const validator = require('email-validator');
const auth = require('../middlewares/auth');
const permit = require('../middlewares/permit');

router.post('/', async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      res.status(400).send({ message: 'Such user already exists' });
    }

    if (!validator.validate(req.body.email)) res.status(400).send({ error: 'Enter correct email address' });

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    user.token = generateToken(user._id);
    await user.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user && (await user.matchPassword(req.body.password))) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).send({ error: 'Invalid email or password' });
    }
  } catch (e) {
    res.status(401).send(e);
  }
});

router.get('/profile', [auth], async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (e) {
    res.status(404).send({ error: 'User not found' });
  }
});

router.put('/profile', [auth], async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
    }

    const updatedUser = await user.save();

    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (e) {
    res.status(404).send(e);
  }
});

router.get('/', [auth, permit('admin')], async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.get('/:id', [auth, permit('admin')], async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    res.send(user);
  } catch (e) {
    res.status(404).send({ error: 'User not found' });
  }
});

router.put('/:id', [auth, permit('admin')], async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
    }

    const updatedUser = await user.save();

    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: user.role,
    });
  } catch (e) {
    res.status(404).send({ error: 'User not found' });
  }
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    await user.remove();
    res.send({ message: 'User removed' });
  } catch (e) {
    res.status(404).send({ error: 'User not found' });
  }
});

module.exports = router;