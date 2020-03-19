const express = require('express');

const cookieParser = require('cookie-parser');

const { join } = require('path');

const errorHandler = require('./controllers/ErrorHandler');

const sysRouter = require('./routes');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(join(__dirname, '..', 'public')));

app.use(sysRouter.staticRouter);

app.use(sysRouter.userRouter);

app.use(sysRouter.authRouter);

app.use(errorHandler.error404);

app.use(errorHandler.error500);

module.exports = app;
