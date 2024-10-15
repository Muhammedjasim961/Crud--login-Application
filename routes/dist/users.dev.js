"use strict";

var express = require('express');

var app = express();
var router = express.Router();

var User = require('../models/user');

var _require = require('express-validator'),
    validationResult = _require.validationResult,
    body = _require.body,
    check = _require.check;

var bcrypt = require('bcryptjs');

var passport = require('passport');

var flash = require('connect-flash'); // const bodyParser = require('body-parser');


router.get('/register', function (req, res) {
  res.render('register');
}); // app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// const confirmPassword = req.body.password;

var userValidation = [body('name').notEmpty().withMessage('Name is required'), body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Must be a valid email'), body('username').notEmpty().withMessage('Username is required'), body('password').notEmpty().withMessage('Password is required'), body('password2').notEmpty().withMessage('Confirm Password is required')]; //Register Process
// router.post('/register', userValidation, (req, res) => {
//   const { name, email, password, password2, username } = req.body;
//   console.log(req.body);
//   let errors = validationResult(req);
//   console.log(errors.array());
//   if (errors) {
//     res.render('register', {
//       errors: errors.array(),
//     });
//   } else {
//     let newUser = new User({
//       name: name,
//       email: email,
//       password: password,
//       username: username,
//     });
//     bcrypt.genSalt(10, (err, salt) => {
//       bcrypt.hash(newUser.password, salt, (err, hash) => {
//         if (err) {
//           console.log(err);
//           return;
//         }
//         newUser.password = hash;
//         newUser.save((err) => {
//           if (err) {
//             console.log(err);
//             return;
//           } else {
//             req.flash('success', 'You Are Now Logged in.');
//             res.redirect('/users/login');
//           }
//         });
//       });
//     });
//   }
// });

router.post('/register', userValidation, function _callee(req, res) {
  var _req$body, name, email, password, username, errors, newUser, salt;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, username = _req$body.username;
          console.log(req.body); // Validate the request

          errors = validationResult(req);
          console.log(errors.array());

          if (errors.isEmpty()) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.render('register', {
            errors: errors.array()
          }));

        case 6:
          _context.prev = 6;
          // Create a new user
          newUser = new User({
            name: name,
            email: email,
            password: password,
            username: username
          }); // Generate salt and hash the password

          _context.next = 10;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 10:
          salt = _context.sent;
          _context.next = 13;
          return regeneratorRuntime.awrap(bcrypt.hash(newUser.password, salt));

        case 13:
          newUser.password = _context.sent;
          _context.next = 16;
          return regeneratorRuntime.awrap(newUser.save());

        case 16:
          // Flash success message and redirect
          req.flash('success', 'You Are Now Logged in.');
          return _context.abrupt("return", res.redirect('/users/login'));

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](6);
          console.error(_context.t0); // Handle errors appropriately, e.g., render an error page or message

          return _context.abrupt("return", res.status(500).render('register', {
            errors: [{
              msg: 'An error occurred while registering. Please try again.'
            }]
          }));

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 20]]);
});
router.get('/login', function (req, res) {
  res.render('login');
});
router.post('/login', function (req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
}); // Logout route

app.get('/logout', function (req, res) {
  req.logout(); // Call logout

  req.flash('success', 'You are logged out'); // Set flash message

  res.redirect('/users/login'); // Redirect to login page
});
module.exports = router;