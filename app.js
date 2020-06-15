const express = require('express');
require('dotenv').config();
const logger = require('morgan');

const conn = require('./database/connection')
const productRouter = require('./routes/product');
const categoryRouter = require('./routes/category');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(`/api/${process.env.API_VERSION}/product`, productRouter);
app.use(`/api/${process.env.API_VERSION}/category`, categoryRouter);

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({ status : false, message : err && err.message ? err.message : "Something went wrong." });
});

module.exports = app;
