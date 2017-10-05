'use strict';

const express = require('express');
const app = express();
const path = require('path');
const scraper = require('./scraper');

app.use(express.static(path.join(__dirname, './node_modules/')));
app.use(express.static(path.join(__dirname, './client/')));

app.get('/culvercity', scraper.getData);
app.get('/lakewood', scraper.getData);

app.listen(3000);

module.exports = app;
