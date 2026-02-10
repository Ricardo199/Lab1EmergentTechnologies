
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    CourseCode: {
        type: String,
        unique: true,
        required: true
    },
    CourseName: {
        type: String,
        required: true
    },
    CourseSection: {
        type: String,
        required: true
    },
    CourseSemester: {
        type: String,
        required: true
    },
    students: [
        {  
            type: mongoose.Schema.Types.ObjectId,    
            ref: 'Student'  
        }
    ]
});

//create new course
courseSchema.statics.createCourse = async function(courseData) {
    const course = new this(courseData);
    await course.save();
    return course;
};

//get all courses
courseSchema.statics.getAllCourses = async function() {
    return await this.find({});
};

//update course by name
courseSchema.statics.updateCourseByName = async function(courseName, updatedData) {
    const course = await this.findOne({ CourseName: courseName });
    return course;
}

//delete course by name
courseSchema.statics.deleteCourseByName = async function(courseName) {
    await this.deleteOne({ CourseName: courseName });
    return { message: `Course with name ${courseName} deleted successfully` };
};

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;