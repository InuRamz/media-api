var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const {swaggerSpec} = require('./jsDocs');
var authentication = require('./middlewares/authentication');
var indexRouter = require('./routes/v1/index');
var indexLogin = require('./routes/v1/auth');
var indexFiles = require('./routes/v1/files');
var indexUser = require('./routes/v1/users');
var indexRole = require('./routes/v1/roles');
var indexPermission = require('./routes/v1/permissions');
var indexCategory = require('./routes/v1/category');
var indexThematic = require('./routes/v1/thematic');
var indexPost = require('./routes/v1/post');
var {connectDB} = require('./mongoose');

var app = express();

// DB conextion
connectDB().then(message => console.log(message)).catch( error => {throw new Error(error)});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/api-docs',          swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1',            indexRouter);
app.use('/api/v1/login',      indexLogin);
app.use('/api/v1/file',       indexFiles);
app.use('/api/v1/user',       authentication.validate, indexUser);
app.use('/api/v1/role',       authentication.validate, indexRole);
app.use('/api/v1/permission', authentication.validate, indexPermission);
app.use('/api/v1/category',   authentication.validate, indexCategory);
app.use('/api/v1/thematic',   authentication.validate, indexThematic);
app.use('/api/v1/post',       authentication.validate, indexPost);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send({status: 404, message: "Service not found", error: "NOT_FOUND"})
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send({
    message: err.message || "Internal server error",
    error: (req.app.get('env') === 'development') ? err.error || "SERVER_ERROR" : {}
  });
});

module.exports = app;
