import React, { useState, useEffect } from 'react';
import { Table, Spinner, Alert } from 'react-bootstrap';
import client from '../graphqlClient';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const query = `{ courses { _id CourseCode CourseName CourseSection CourseSemester } }`;
      const data = await client.request(query);
      setCourses(data.courses);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <Spinner animation="border" role="status" aria-label="Loading courses" />;
  if (error) return <Alert variant="danger" role="alert">Error: {error}</Alert>;

  return (
    <div>
      <h2>Courses</h2>
      <Table striped bordered hover responsive aria-label="Course list table">
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Section</th>
            <th>Semester</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course._id}>
              <td>{course.CourseCode}</td>
              <td>{course.CourseName}</td>
              <td>{course.CourseSection}</td>
              <td>{course.CourseSemester}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default CourseList;
