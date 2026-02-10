import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import client from '../graphqlClient';

function AddCourse() {
  const [formData, setFormData] = useState({
    CourseCode: '', CourseName: '', CourseSection: '', CourseSemester: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const mutation = `mutation {
        addCourse(
          CourseCode: "${formData.CourseCode}"
          CourseName: "${formData.CourseName}"
          CourseSection: "${formData.CourseSection}"
          CourseSemester: "${formData.CourseSemester}"
        ) { _id CourseCode CourseName }
      }`;
      await client.request(mutation);
      setSuccess(true);
      setError(null);
      setFormData({ CourseCode: '', CourseName: '', CourseSection: '', CourseSemester: '' });
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <div>
      <h2>Add Course</h2>
      {success && <Alert variant="success" role="alert">Course added successfully!</Alert>}
      {error && <Alert variant="danger" role="alert">Error: {error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="CourseCode">Course Code</Form.Label>
          <Form.Control id="CourseCode" name="CourseCode" value={formData.CourseCode} onChange={handleChange} required aria-required="true" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="CourseName">Course Name</Form.Label>
          <Form.Control id="CourseName" name="CourseName" value={formData.CourseName} onChange={handleChange} required aria-required="true" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="CourseSection">Section</Form.Label>
          <Form.Control id="CourseSection" name="CourseSection" value={formData.CourseSection} onChange={handleChange} required aria-required="true" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="CourseSemester">Semester</Form.Label>
          <Form.Control id="CourseSemester" name="CourseSemester" value={formData.CourseSemester} onChange={handleChange} required aria-required="true" />
        </Form.Group>
        <Button variant="primary" type="submit">Add Course</Button>
      </Form>
    </div>
  );
}

export default AddCourse;
