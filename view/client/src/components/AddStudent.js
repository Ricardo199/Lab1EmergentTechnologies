import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import client from '../graphqlClient';

function AddStudent() {
  const [formData, setFormData] = useState({
    StudentNumber: '', Password: '', FirstName: '', LastName: '',
    Address: '', City: '', Email: '', PhoneNumber: '', Program: ''
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
        addStudent(
          StudentNumber: "${formData.StudentNumber}"
          Password: "${formData.Password}"
          FirstName: "${formData.FirstName}"
          LastName: "${formData.LastName}"
          Address: "${formData.Address}"
          City: "${formData.City}"
          Email: "${formData.Email}"
          PhoneNumber: "${formData.PhoneNumber}"
          Program: "${formData.Program}"
        ) { _id FirstName LastName }
      }`;
      await client.request(mutation);
      setSuccess(true);
      setError(null);
      setFormData({ StudentNumber: '', Password: '', FirstName: '', LastName: '', Address: '', City: '', Email: '', PhoneNumber: '', Program: '' });
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <div>
      <h2>Add Student</h2>
      {success && <Alert variant="success" role="alert">Student added successfully!</Alert>}
      {error && <Alert variant="danger" role="alert">Error: {error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="StudentNumber">Student Number</Form.Label>
          <Form.Control id="StudentNumber" name="StudentNumber" value={formData.StudentNumber} onChange={handleChange} required aria-required="true" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="Password">Password</Form.Label>
          <Form.Control id="Password" type="password" name="Password" value={formData.Password} onChange={handleChange} required aria-required="true" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="FirstName">First Name</Form.Label>
          <Form.Control id="FirstName" name="FirstName" value={formData.FirstName} onChange={handleChange} required aria-required="true" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="LastName">Last Name</Form.Label>
          <Form.Control id="LastName" name="LastName" value={formData.LastName} onChange={handleChange} required aria-required="true" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="Address">Address</Form.Label>
          <Form.Control id="Address" name="Address" value={formData.Address} onChange={handleChange} required aria-required="true" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="City">City</Form.Label>
          <Form.Control id="City" name="City" value={formData.City} onChange={handleChange} required aria-required="true" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="Email">Email</Form.Label>
          <Form.Control id="Email" type="email" name="Email" value={formData.Email} onChange={handleChange} required aria-required="true" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="PhoneNumber">Phone Number</Form.Label>
          <Form.Control id="PhoneNumber" name="PhoneNumber" value={formData.PhoneNumber} onChange={handleChange} required aria-required="true" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="Program">Program</Form.Label>
          <Form.Control id="Program" name="Program" value={formData.Program} onChange={handleChange} required aria-required="true" />
        </Form.Group>
        <Button variant="primary" type="submit">Add Student</Button>
      </Form>
    </div>
  );
}

export default AddStudent;
