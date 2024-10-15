const express = require('express');
const app = express();
const router = express.Router();
const User = require('../models/user');
const { validationResult, body, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const flash = require('connect-flash');
// const bodyParser = require('body-parser');

router.get('/register', (req, res) => {
  res.render('register');
});

// app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// const confirmPassword = req.body.password;

const userValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
  body('password2').notEmpty().withMessage('Confirm Password is required'),
];

//Register Process
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

router.post('/register', userValidation, async (req, res) => {
  const { name, email, password, username } = req.body;
  console.log(req.body);

  // Validate the request
  const errors = validationResult(req);
  console.log(errors.array());

  if (!errors.isEmpty()) {
    return res.render('register', {
      errors: errors.array(),
    });
  }

  try {
    // Create a new user
    const newUser = new User({
      name,
      email,
      password,
      username,
    });

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    // Save the new user to the database
    await newUser.save();

    // Flash success message and redirect
    req.flash('success', 'You Are Now Logged in.');
    return res.redirect('/users/login');
  } catch (err) {
    console.error(err);
    // Handle errors appropriately, e.g., render an error page or message
    return res.status(500).render('register', {
      errors: [
        { msg: 'An error occurred while registering. Please try again.' },
      ],
    });
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
});

// Logout route
app.get('/logout', (req, res) => {
  req.logout(); // Call logout
  req.flash('success', 'You are logged out'); // Set flash message
  res.redirect('/users/login'); // Redirect to login page
});

module.exports = router;
