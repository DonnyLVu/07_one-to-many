const express = require('express');
const COFFEE = require('./model/coffee.js');
const SODA = require('./models/soda.js');
const app = express();
app.use(express.json());

module.exports = app;
