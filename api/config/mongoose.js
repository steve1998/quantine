const mongoose = require('mongoose');
const {dbUri} = require('./env');

function startMongooseConnection() {
  //@todo make this conn function

  mongoose.set('debug', true);
  mongoose.Promise = Promise;
  mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
    .catch(err => console.log(err));
  mongoose.connection.on('error', err => {
    console.log(err);
  })
}

module.exports = startMongooseConnection;
