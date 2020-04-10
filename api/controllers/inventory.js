const { inventory } = require('../core/inventory');

const createInventoryMethods = () => {
  return {
    async getOne (req, res, next){
     const Inventory = inventory.findOne();
     return res.json(Inventory);
    },
    async getMany(req, res, next){
      const Inventory = inventory.findMany();
      return res.json(Inventory);
    },
    async new(req, res, next) {
      const Inventory = inventory.createOne(req.body);
      return res.json(Inventory);
    } 
  };
};

const Inventory = createInventoryMethods();
module.exports = { Inventory, createInventoryMethods };