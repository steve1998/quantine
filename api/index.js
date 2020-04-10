const express = require('express');
const app = express();
const { PORT } = require('./config/env');
const routes = require('./routes');

app.use('/api', routes);
// Start the server
app.listen(PORT, function () {
  console.log(`Server is starting on port ${PORT}`);
})
