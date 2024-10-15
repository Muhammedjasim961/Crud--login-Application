"use strict";

var express = require('express');

var router = express.Router();

var Student = require('../models/students');

var _require = require('express-validator'),
    validationResult = _require.validationResult,
    body = _require.body,
    check = _require.check;

router.get('/students_list/:id', function (req, res) {
  var id = req.params.id;
  Student.findById(id).then(function (Student) {
    res.render('students_list', {
      Student: Student
    });
  })["catch"](function (err) {
    console.error(err);
    res.status(500).send('Error fetching student');
  });
}); //Add routes

router.get('/add_student', function (req, res) {
  {
    res.render('add_student', {
      name: 'Add Student',
      Student: Student
    });
  }
});
var studentValidation = [body('name').notEmpty().withMessage('Name must be Required'), body('age').notEmpty().withMessage('Age must be Required')]; //Add student

router.post('/add_student', studentValidation, function _callee(req, res) {
  var errors;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          errors = req.validationErrors();
          console.log(errors.array());

          if (errors) {
            res.render('add_student', {
              name: 'Add Student',
              errors: errors
            });
          }

          Student.name = req.body.name;
          Student.age = req.body.age;
          Student.save(function () {
            if (err) {
              console.log(err);
              return;
            } else {
              req.flash('success', 'Student Added');
              res.redirect('/');
            }
          });

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}); // Edit Student

router.get('/edit/:id', function (req, res) {
  var id = req.params.id;
  Student.findById(id).then(function (Student) {
    res.render('edit_student', {
      title: 'Edit Student',
      Student: Student
    }); // res.redirect('students_list');
  })["catch"](function (err) {
    console.error(err);
    res.status(500).send('Error fetching student');
  });
}); //Update post Student

router.post('/edit/:id', function _callee2(req, res) {
  var id, updatedStudent;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Student.findByIdAndUpdate(id, req.body, {
            "new": true
          }));

        case 4:
          updatedStudent = _context2.sent;

          if (updatedStudent) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: 'Student not found'
          }));

        case 9:
          // res.status(200).json(updatedStudent);
          console.log(updatedStudent);

        case 10:
          req.flash('success', 'student Updated');
          res.redirect('/');
          _context2.next = 17;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: _context2.t0.message
          });

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 14]]);
}); //Delete Student

router["delete"]('/student/:id', function _callee3(req, res) {
  var result;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Student.findByIdAndDelete(req.params.id));

        case 3:
          result = _context3.sent;

          if (result) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(404).send('Student not found'));

        case 6:
          res.redirect('/');
          req.flash('success', 'deleted');
          _context3.next = 14;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).send('Server error');

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
module.exports = router;