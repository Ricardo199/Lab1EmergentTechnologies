const Student = require('./model/student');
const Course = require('./model/course');

module.exports = {
  students: async () => await Student.find(),
  student: async ({ id }) => await Student.findById(id),
  courses: async () => await Course.find(),
  course: async ({ id }) => await Course.findById(id),
  addStudent: async (args) => {
    const student = new Student(args);
    return await student.save();
  },
  addCourse: async (args) => {
    const course = new Course(args);
    return await course.save();
  }
};
