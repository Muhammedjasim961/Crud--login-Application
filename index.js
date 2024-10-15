const path = require('path');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Student = require('./models/students');
const express = require('express');
const { body, validationResult } = require('express-validator');
const session = require('express-session');
const flash = require('connect-flash');
const localStrategy = require('passport-local').Strategy;
const passport = require('passport');
const config = require('./config/database');
const User = require('./models/user');
const app = express();

//nodejs favicon
app.use(favicon(path.join(__dirname, 'public/image', 'node-js.png')));

//mongodb connection Using Mongoose Library
mongoose.connect(config.database);

let db = mongoose.connection;
//Api Port

//Check connection
db.once('open', () => {
  console.log('MongoDB is connected');
});
//Error checking
db.on('error', (err) => {
  console.log(err);
});

//Load view ENgine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// express session middleware
app.use(
  session({
    secret: 'your-secret', // Replace with your secret key
    resave: true, // Prevents resaving sessions if they haven't changed
    saveUninitialized: true, // Saves a new session even if it hasn't been modified
    //cookie: { secure: false }, // Set to true if using HTTPS
  })
);

//passport config
require('./config/passport').passport;
//passportMiddleware
app.use(passport.initialize());
app.use(passport.session());

// setup flash
app.use(flash());
// Set up middleware to expose flash messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// express message middleware
app.use(require('connect-flash')());
app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// app.use(
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
const validateStudents = [
  body('name').notEmpty().withMessage('Name must be Required'),
  body('age').notEmpty().withMessage('Age must be Required'),
];

app.post('/add_student', validateStudents, (req, res) => {
  const errors = validationResult(req);
  console.log(errors.array());
});

//validation setup
// app.use(validationResult());
// console.log('Validation Result:', validationResult(req));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set public folder using use method
app.use(express.static(path.join(__dirname, 'public')));
const port = process.env.port || 3001;

app.get('*', (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// get all students
app.get('/', (req, res) => {
  Student.find({})
    .then((students) => {
      res.render('app', { students: students, title: 'Students List' });
    })
    .catch((err) => {
      console.error(err);
    });
});

//Students Routes Files
const studentRout = require('./routes/all_students');
const usersRout = require('./routes/users');
// const { error } = require('console');
app.use('/', studentRout);
app.use('/users', usersRout);

app.listen(port, () => {
  console.log(`Port is running on ${port}..`);
});
