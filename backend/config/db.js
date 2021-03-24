const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI,
      { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

    console.log(`MongoDB connected`.green.inverse);
  } catch (e) {
    console.error(`Error: ${e.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;