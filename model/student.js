const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    StudentNumber:{
        type: String,
        unique: true
    },
    Password:{
        type: String,
        unique: true,
        required: true
    },
    FirstName:{
        type: String,
        required: true
    },
    LastName:{
        type: String,
        required: true
    },
    Address:{
        type: String,
        required: true
    },
    City:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    PhoneNumber:{
        type: String,
        required: true
    },
    Program:{
        type: String,
        required: true
    },
    EnroledCourses:[
        {
            CourseCode: String,
            CourseName: String,
            CourseSection: String
        }
    ],
    TechnicalElectives:[
        {
            CourseCode: String,
            CourseName: String,
            CourseSection: String
        }
    ]
});

//create new student
studentSchema.statics.createStudent = async function(studentData) {
    const student = new this(studentData);
    await student.save();
    return student;
}

//find student by student number
studentSchema.statics.findByStudentNumber = async function(studentNumber) {
    return await this.findOne({ StudentNumber: studentNumber });
}

//find student by name
studentSchema.statics.findByName = async function(firstName, lastName) {
    return await this.findOne({ FirstName: firstName, LastName: lastName });
}

//update student information
studentSchema.methods.updateInfo = async function(info) {
    for (let key in info) {
        if (this[key] !== undefined) {
            this[key] = info[key];
        }
    }
    await this.save();
    return this;
}

//update student information by student number
studentSchema.statics.updateStudentByStudentNumber = async function(studentNumber, updateData) {
    return await this.findOneAndUpdate(
        { StudentNumber: studentNumber }, 
        updateData, 
        { new: true }
    );
};

//delete student by id
studentSchema.statics.deleteById = async function(id) {
    await this.findByIdAndDelete(id);
    return { message: `Student with id ${id} deleted successfully` };
};

module.exports = mongoose.model('Student', studentSchema);