var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var path = require('path');
var cors = require('cors');
var fs = require('fs');
var express = require('express');

const config = require('./config/database');

mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
  console.log('connected to database ' + config.database);
});
mongoose.connection.on('error', (err) => {
  console.log('database error ' + err);
});

var app = express();
//CORS middleware
app.use(cors());


const users = require('./routes/users');
//body parser middleware
app.use(bodyParser.json());


//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
//imports
// var indexRoutes = require('./routes/index');
// var users = require('./routes/users');

app.set('view engine', 'handlebars');

app.engine('html', function (path, options, callbacks) {
  fs.readFile(path, 'utf-8', callback);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', users);

// app.use('/', indexRoutes);
app.get('/', (req, res) => {
  res.send('invalid endpoint');
});
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
});

module.exports = app;
