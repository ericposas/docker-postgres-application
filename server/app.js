var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();

const { Client } = require('pg');

const client = new Client({
  connectionString: "postgresql://postgres:root@postgres:5432/db"
}); // @postgres refers to docker internal mapping of postgres container address

const connectDB = async () => {
  try {
    console.log('Connect to Postgres...');
    client.connect();
    await new Promise((resolve, reject) => {
      client.query('Select now() as run_at;', (err, res) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log(`Run at date-time : ${res.rows[0].run_at}`);
          resolve(res.rows[0].run_at);
        }
      });
    });
    await client.end();
    console.log('Execution Completed...');
  } catch (err) {
    throw new Error(err);
  }
}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '../frontend/build')));

//app.use('/', indexRouter);
//app.use(express.static('dist'));
//app.use('/users', usersRouter);

app.use('/test', (req, res) => res.send('hello mr.'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {
  connectDB,
  app
};