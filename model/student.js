const mongoose = require('mongoose');
const crypto = require('crypto');

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
    ],
    Role:{
        type: String,
        default: 'student'
    }
});

//hash password before saving
studentSchema.pre('save', function(next) {
    if (this.isModified('Password')) {
        this.Password = crypto.createHash('sha256').update(this.Password).digest('hex');
    }
    next();
});

//compare password method
studentSchema.methods.comparePassword = function(candidatePassword) {
    const hashedCandidate = crypto.createHash('sha256').update(candidatePassword).digest('hex');
    return this.Password === hashedCandidate;
};

//create new student
studentSchema.statics.createStudent = async function(studentData) {
    const student = new this(studentData);
    await student.save();
    return { message: `Student with number ${student.StudentNumber} created successfully` };
};

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