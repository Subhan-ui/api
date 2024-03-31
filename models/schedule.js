const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    day: {
        type: String,
        required: [true, 'Day must be specified'],
    },
    classRoom: {
        type: String,
        required: [true, 'Classroom must be specified']
    },
    time: {
        type: String,
        required: [true, 'Time must be specified'],
    },
    degree: {
        type: String,
        required: [true, 'Classroom name must be specified']
    },
    teacher: {
        type: String,
        required: [true, 'Teacher must be specified']
    },
    course: {
        type: String,
        required: [true, 'Course must be specified']
    }
})

const Schedule = mongoose.model('Schedule',scheduleSchema);
module.exports = Schedule;