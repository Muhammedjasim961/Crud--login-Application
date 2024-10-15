"use strict";

var mongoose = require('mongoose');

var StudentSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Type Student Name']
  },
  age: {
    type: Number,
    require: [true, 'Type Student Age']
  }
});
var Student = mongoose.model('Student', StudentSchema);
module.exports = Student;