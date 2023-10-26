const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength:[55,'Name shouldnt be more than 55 character'],
        required: [true,'Please provide the teachers name']
    },
    gender:{
        type: String,
        enum: ['Male','Female','FEMALE','MALE','OTHERS','Others','F','M']
    },
    qualification:{
        type: String,
    },
    appointmentDate:{
        type: Date,
        default: Date.now()
    },
    level:{
        type: Number,
        default: 6
    },
    gradeLevel:{
        type: Number,
        default: 1
    },

});



const Teacher = mongoose.model('Teacher',teacherSchema);
module.exports = Teacher;