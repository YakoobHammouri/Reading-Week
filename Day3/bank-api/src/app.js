const express = require('express');
const router = require('./controllers');
const errorHandler = require('./controllers/ErrorHandler');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);
app.use(errorHandler.error404);
app.use(errorHandler.error500);
module.exports = app;
