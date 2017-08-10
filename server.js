'use strict';

const express = require('express');
const app = express();
const scraper = require('./scraper');

app.get('/culvercity', scraper.getData);
app.get('/lakewood', scraper.getData);

app.listen(3000);

module.exports = app;
