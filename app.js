var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./db/db');

var indexRouter = require('./routes/index');
var Users = require('./routes/Users')
var Admins = require('./routes/Admins')
var Books = require('./routes/Books');
var Transactions = require('./routes/Transactions');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', Users)
app.use('/admin', Admins)
app.use('/books', Books)
app.use('/transdetails', Transactions);


module.exports = app;
