const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = Schema({
  // _id is added by default field in mongoose
  owner: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
});


const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
