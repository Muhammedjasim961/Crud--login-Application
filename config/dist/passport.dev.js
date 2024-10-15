"use strict";

var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

var config = require('../config/database');

var passport = require('passport');

var bcrypt = require('bcryptjs'); // //Local Strategy
// passport.use(
//   // new LocalStrategy(async (username, password, done) => {
//   //   try {
//   //     const user = await User.findOne({ username });
//   //     if (!user) {
//   //       return done(null, false, { message: 'Incorrect username.' });
//   //     }
//   //     const isPasswordValid = await user.verifyPassword(password); // Assuming this is a promise-based method
//   //     if (!isPasswordValid) {
//   //       return done(null, false, { message: 'Incorrect password.' });
//   //     }
//   //     return done(null, user);
//   //   } catch (err) {
//   //     return done(err);
//   //   }
//   // })
// );


passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
passport.use(new LocalStrategy(function _callee(username, password, done) {
  var user, isMatch;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            username: username
          }));

        case 3:
          user = _context.sent;

          if (user) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", done(null, false, {
            message: 'No user found'
          }));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 8:
          isMatch = _context.sent;

          if (!isMatch) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", done(null, user));

        case 13:
          return _context.abrupt("return", done(null, false, {
            message: 'Wrong password'
          }));

        case 14:
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", done(_context.t0));

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
}));
module.exports = passport;