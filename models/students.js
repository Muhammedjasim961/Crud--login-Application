const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Type Student Name'],
  },
  age: {
    type: Number,
    require: [true, 'Type Student Age'],
  },
});

const Student = mongoose.model('Student', StudentSchema);
module.exports = Student;
