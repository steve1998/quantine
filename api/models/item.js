const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = Schema({
  // _id is added by default field in mongoose
  amount: {
    type: Number,
    required: false,
    unique: false
  }
});


const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
