const express = require('express');
const apiRouter = express.Router();
const { auth } = require('../controllers/auth');
const { Inventory } = require('../controllers/inventory');
const startMongooseConnection = require('../config/mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('../controllers/errorHandler');
const inventoryRouter = express.Router();

startMongooseConnection();

apiRouter.use(cors());
apiRouter.use(bodyParser.json());

apiRouter.post('/auth/signin', auth.signin);
apiRouter.post('/auth/signup', auth.signup);

apiRouter.use('/inventories', inventoryRouter);

inventoryRouter.route('/')
.get(Inventory.getMany);

inventoryRouter.route('/one')
  .get(Inventory.getOne)
  .post(Inventory.new);

apiRouter.use((req, res, next) => {
  next({ status: 404, message: 'Not Found' });
});

apiRouter.use(errorHandler);

module.exports = apiRouter;
