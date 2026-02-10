const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Student {
    _id: ID!
    StudentNumber: String!
    FirstName: String!
    LastName: String!
    Email: String!
    Program: String!
  }

  type Course {
    _id: ID!
    CourseCode: String!
    CourseName: String!
    CourseSection: String!
    CourseSemester: String!
  }

  type Query {
    students: [Student]
    student(id: ID!): Student
    courses: [Course]
    course(id: ID!): Course
  }

  type Mutation {
    addStudent(StudentNumber: String!, Password: String!, FirstName: String!, LastName: String!, Address: String!, City: String!, Email: String!, PhoneNumber: String!, Program: String!): Student
    addCourse(CourseCode: String!, CourseName: String!, CourseSection: String!, CourseSemester: String!): Course
  }
`);
