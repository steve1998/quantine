const Inventory = require('../models/inventory');
const Item = require('../models/item');

const createInventoryMethods = (InventoryModel, ItemModel) => {
  return {
    /**
     * Find many Inventories
     */
    async findMany () {
      const inventories = InventoryModel.find({});
      return inventories;
    },
    /**
     * Find one Inventory
     * @param {*} search search obj
     */
    async findOne (search = {}) {
      const inventory = InventoryModel.findOne(search);
      return inventory;
    }, 
    /**
     * Create new inventory
     * @todo limit: can't create if already owns 2 Inventories
     */
    async createOne () {
      const inventory = InventoryModel.create({});
      const foundInventory = InventoryModel.findById(inventory._id);
      return foundInventory;
    }
  };
};

const inventory = createInventoryMethods(Inventory, Item);

module.exports = { createInventoryMethods, inventory };
