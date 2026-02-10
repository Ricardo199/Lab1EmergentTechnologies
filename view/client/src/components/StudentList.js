import React, { useState, useEffect } from 'react';
import { Table, Spinner, Alert } from 'react-bootstrap';
import client from '../graphqlClient';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const query = `{ students { _id StudentNumber FirstName LastName Email Program } }`;
      const data = await client.request(query);
      setStudents(data.students);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <Spinner animation="border" role="status" aria-label="Loading students" />;
  if (error) return <Alert variant="danger" role="alert">Error: {error}</Alert>;

  return (
    <div>
      <h2>Students</h2>
      <Table striped bordered hover responsive aria-label="Student list table">
        <thead>
          <tr>
            <th>Student Number</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Program</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td>{student.StudentNumber}</td>
              <td>{student.FirstName}</td>
              <td>{student.LastName}</td>
              <td>{student.Email}</td>
              <td>{student.Program}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default StudentList;
