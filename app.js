const express = require('express');
const app = express();
const PORT = 50001;
const https = require('https');
const fs = require('fs');
const routes = require('./routes.js')

app.use('/', routes);

const options = {
    key: fs.readFileSync('./security/cert.key'),
    cert: fs.readFileSync('./security/cert.pem'),
}

const server = https
    .createServer(options, app)
    .listen(PORT, () => `server https listens on ${PORT}`);
