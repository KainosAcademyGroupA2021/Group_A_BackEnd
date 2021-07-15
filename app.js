const express = require('express');
const app = express();
const port = 5000;
const routes = require('./routes.js')

app.use('/', routes);

app.listen(port, () => console.log(`Group A app listening on port ${port}!`));
