const router = require('express').Router();
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const validator = require('email-validator');

router.post('/', async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      res.status(400).send({ message: 'Such user already exists' });
    }

    if (!validator.validate(req.body.email)) res.status(400).send({error: 'Enter correct email address'});

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



module.exports = router;