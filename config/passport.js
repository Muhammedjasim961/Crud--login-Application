const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('../config/database');
const passport = require('passport');
const bcrypt = require('bcryptjs');

// //Local Strategy
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

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return done(null, false, { message: 'No user found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Wrong password' });
      }
    } catch (err) {
      return done(err); // Pass the error to done
    }
  })
);
module.exports = passport;
