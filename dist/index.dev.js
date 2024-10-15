"use strict";

require('dotenv').config();

var path = require('path');

var favicon = require('serve-favicon');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var Student = require('./models/students');

var express = require('express');

var _require = require('express-validator'),
    body = _require.body,
    validationResult = _require.validationResult;

var session = require('express-session');

var flash = require('connect-flash');

var localStrategy = require('passport-local').Strategy;

var passport = require('passport'); // const config = require('./config/database');


var User = require('./models/user');

var app = express(); //nodejs favicon

app.use(favicon(path.join(__dirname, 'public/image', 'node-js.png'))); //mongodb connection Using Mongoose Library
// mongoose.connection.process.env || 3010;

var db = mongoose.connection; //Api Port

var _require2 = require('mongodb'),
    MongoClient = _require2.MongoClient;

var uri = process.env.MONGO_URI; // Accessing the MongoDB URI

MongoClient.connect(uri).then(function (client) {
  console.log('Connected to Database');
  var db = client.db('betas_students'); // Your code to work with the database goes here
})["catch"](function (error) {
  return console.error(error);
}); //Check connection

db.once('open', function () {
  console.log('MongoDB is connected');
}); //Error checking

db.on('error', function (err) {
  console.log(err);
}); //Load view ENgine

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); // express session middleware

app.use(session({
  secret: 'your-secret',
  // Replace with your secret key
  resave: true,
  // Prevents resaving sessions if they haven't changed
  saveUninitialized: true // Saves a new session even if it hasn't been modified
  //cookie: { secure: false }, // Set to true if using HTTPS

})); //passport config

require('./config/passport').passport; //passportMiddleware

app.use(passport.initialize());
app.use(passport.session()); // setup flash

app.use(flash()); // Set up middleware to expose flash messages

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
}); // express message middleware

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
}); // app.use(
//   expressValidator({
//     errorFormatter: (param, msg, value) => {
//       const namespace = param.split('.'),
//         root = namespace.shift(),
//         formParam = root;
//       while (namespace.length) {
//         formParam += '[' + namespace.shift() + ']';
//       }
//       return {
//         param: formParam,
//         msg: msg,
//         value: value,
//       };
//     },
//   })
// );
//  express_validator

var validateStudents = [body('name').notEmpty().withMessage('Name must be Required'), body('age').notEmpty().withMessage('Age must be Required')];
app.post('/add_student', validateStudents, function (req, res) {
  var errors = validationResult(req);
  console.log(errors.array());
}); //validation setup
// app.use(validationResult());
// console.log('Validation Result:', validationResult(req));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json()); // Set public folder using use method

app.use(express["static"](path.join(__dirname, 'public')));
var port = process.env.port || 3001;
app.get('*', function (req, res, next) {
  res.locals.user = req.user || null;
  next();
}); // get all students

app.get('/', function (req, res) {
  Student.find({}).then(function (students) {
    res.render('app', {
      students: students,
      title: 'Students List'
    });
  })["catch"](function (err) {
    console.error(err);
  });
}); //Students Routes Files

var studentRout = require('./routes/all_students');

var usersRout = require('./routes/users'); // const { error } = require('console');


app.use('/', studentRout);
app.use('/users', usersRout);
app.listen(port, function () {
  console.log("Port is running on ".concat(port, ".."));
});