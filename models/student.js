const mongoose = require('mongoose');

const date = new Date();
const now = date.toLocaleTimeString();
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Your name is required'],
    },
    agno: {
        type: String,
        required: [true, 'Your registration number is required'],
        unique: [true, 'Your attendance is already marked']
    },
    time: {
        type: String,
        required:[true, 'Your time is required'],
    },

})
const Student = mongoose.model('Student', studentSchema);
module.exports = Student;