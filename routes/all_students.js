const express = require('express');
const router = express.Router();
const Student = require('../models/students');
const { validationResult, body, check } = require('express-validator');
router.get('/students_list/:id', (req, res) => {
  const id = req.params.id;
  Student.findById(id)
    .then((Student) => {
      res.render('students_list', { Student: Student });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error fetching student');
    });
});

//Add routes
router.get('/add_student', (req, res) => {
  {
    res.render('add_student', {
      name: 'Add Student',
      Student: Student,
    });
  }
});

const studentValidation = [
  body('name').notEmpty().withMessage('Name must be Required'),
  body('age').notEmpty().withMessage('Age must be Required'),
];

//Add student
router.post('/add_student',studentValidation, async (req, res) => {
  let errors = req.validationErrors();
  console.log(errors.array());
  if (errors) {
    res.render('add_student', {
      name: 'Add Student',
      errors: errors,
    });
  }
  Student.name = req.body.name;
  Student.age = req.body.age;

  Student.save(() => {
    if (err) {
      console.log(err);
      return;
    } else {
      req.flash('success', 'Student Added');
      res.redirect('/');
    }
  });
});

// Edit Student
router.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  Student.findById(id)
    .then((Student) => {
      res.render('edit_student', { title: 'Edit Student', Student: Student });
      // res.redirect('students_list');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error fetching student');
    });
});

//Update post Student
router.post('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    } else {
      // res.status(200).json(updatedStudent);
      console.log(updatedStudent);
    }

    req.flash('success', 'student Updated');
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete Student
router.delete('/student/:id', async (req, res) => {
  try {
    const result = await Student.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).send('Student not found');
    }
    res.redirect('/');
    req.flash('success', 'deleted');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
