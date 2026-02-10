import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Table, Form, Spinner, Alert } from 'react-bootstrap';

function AdminDashboard() {
  const [selectedView, setSelectedView] = useState('allStudents');
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    StudentNumber: '', Password: '', FirstName: '', LastName: '',
    Address: '', City: '', Email: '', PhoneNumber: '', Program: ''
  });
  const [courseCode, setCourseCode] = useState('');

  useEffect(() => {
    if (selectedView === 'allStudents') fetchAllStudents();
    if (selectedView === 'allCourses') fetchAllCourses();
  }, [selectedView]);

  const fetchAllStudents = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/students', {
        credentials: 'include'
      });
      const data = await response.json();
      setStudents(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const fetchAllCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/courses', {
        credentials: 'include'
      });
      const data = await response.json();
      setCourses(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSuccess('Student added successfully!');
        setFormData({ StudentNumber: '', Password: '', FirstName: '', LastName: '', Address: '', City: '', Email: '', PhoneNumber: '', Program: '' });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchCourseStudents = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/courses', {
        credentials: 'include'
      });
      const allCourses = await response.json();
      const course = allCourses.find(c => c.CourseCode === courseCode);
      if (course && course.students) {
        const studentPromises = course.students.map(id => 
          fetch(`http://localhost:5000/api/students/${id}`, { credentials: 'include' }).then(r => r.json())
        );
        const studentsData = await Promise.all(studentPromises);
        setStudents(studentsData);
      } else {
        setStudents([]);
      }
      setError(null);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess(null)} dismissible>{success}</Alert>}

      <Row className="mb-3">
        <Col>
          <Button variant="primary" onClick={() => setSelectedView('allStudents')} className="me-2">All Students</Button>
          <Button variant="info" onClick={() => setSelectedView('allCourses')} className="me-2">All Courses</Button>
          <Button variant="success" onClick={() => setSelectedView('addStudent')} className="me-2">Add Student</Button>
          <Button variant="warning" onClick={() => setSelectedView('courseStudents')}>Course Students</Button>
        </Col>
      </Row>

      {selectedView === 'allStudents' && (
        <Card>
          <Card.Header>All Students</Card.Header>
          <Card.Body>
            {loading ? <Spinner animation="border" /> : (
              <Table striped bordered hover responsive aria-label="All students table">
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
                  {students.length === 0 ? (
                    <tr><td colSpan="5" className="text-center">No students found</td></tr>
                  ) : (
                    students.map((student) => (
                      <tr key={student._id}>
                        <td>{student.StudentNumber}</td>
                        <td>{student.FirstName}</td>
                        <td>{student.LastName}</td>
                        <td>{student.Email}</td>
                        <td>{student.Program}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      )}

      {selectedView === 'allCourses' && (
        <Card>
          <Card.Header>All Courses</Card.Header>
          <Card.Body>
            {loading ? <Spinner animation="border" /> : (
              <Table striped bordered hover responsive aria-label="All courses table">
                <thead>
                  <tr>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Section</th>
                    <th>Semester</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.length === 0 ? (
                    <tr><td colSpan="4" className="text-center">No courses found</td></tr>
                  ) : (
                    courses.map((course) => (
                      <tr key={course._id}>
                        <td>{course.CourseCode}</td>
                        <td>{course.CourseName}</td>
                        <td>{course.CourseSection}</td>
                        <td>{course.CourseSemester}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      )}

      {selectedView === 'addStudent' && (
        <Card>
          <Card.Header>Add Student</Card.Header>
          <Card.Body>
            <Form onSubmit={handleAddStudent}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="studentNumber">Student Number</Form.Label>
                <Form.Control 
                  id="studentNumber" 
                  type="text" 
                  placeholder="Enter student number" 
                  value={formData.StudentNumber}
                  onChange={(e) => setFormData({...formData, StudentNumber: e.target.value})}
                  required
                  aria-required="true" 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control 
                  id="password" 
                  type="password" 
                  placeholder="Enter password" 
                  value={formData.Password}
                  onChange={(e) => setFormData({...formData, Password: e.target.value})}
                  required
                  aria-required="true" 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="firstName">First Name</Form.Label>
                <Form.Control 
                  id="firstName" 
                  type="text" 
                  placeholder="Enter first name" 
                  value={formData.FirstName}
                  onChange={(e) => setFormData({...formData, FirstName: e.target.value})}
                  required
                  aria-required="true" 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="lastName">Last Name</Form.Label>
                <Form.Control 
                  id="lastName" 
                  type="text" 
                  placeholder="Enter last name" 
                  value={formData.LastName}
                  onChange={(e) => setFormData({...formData, LastName: e.target.value})}
                  required
                  aria-required="true" 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="address">Address</Form.Label>
                <Form.Control 
                  id="address" 
                  type="text" 
                  placeholder="Enter address" 
                  value={formData.Address}
                  onChange={(e) => setFormData({...formData, Address: e.target.value})}
                  required
                  aria-required="true" 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="city">City</Form.Label>
                <Form.Control 
                  id="city" 
                  type="text" 
                  placeholder="Enter city" 
                  value={formData.City}
                  onChange={(e) => setFormData({...formData, City: e.target.value})}
                  required
                  aria-required="true" 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control 
                  id="email" 
                  type="email" 
                  placeholder="Enter email" 
                  value={formData.Email}
                  onChange={(e) => setFormData({...formData, Email: e.target.value})}
                  required
                  aria-required="true" 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="phoneNumber">Phone Number</Form.Label>
                <Form.Control 
                  id="phoneNumber" 
                  type="text" 
                  placeholder="Enter phone number" 
                  value={formData.PhoneNumber}
                  onChange={(e) => setFormData({...formData, PhoneNumber: e.target.value})}
                  required
                  aria-required="true" 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="program">Program</Form.Label>
                <Form.Control 
                  id="program" 
                  type="text" 
                  placeholder="Enter program" 
                  value={formData.Program}
                  onChange={(e) => setFormData({...formData, Program: e.target.value})}
                  required
                  aria-required="true" 
                />
              </Form.Group>
              <Button variant="success" type="submit">Add Student</Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      {selectedView === 'courseStudents' && (
        <Card>
          <Card.Header>Students in Course</Card.Header>
          <Card.Body>
            <Form onSubmit={fetchCourseStudents}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="courseCodeFilter">Course Code</Form.Label>
                <Form.Control 
                  id="courseCodeFilter" 
                  type="text" 
                  placeholder="Enter course code" 
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  required
                  aria-required="true" 
                />
                <Button variant="primary" className="mt-2" type="submit">Search</Button>
              </Form.Group>
            </Form>
            {loading ? <Spinner animation="border" /> : (
              <Table striped bordered hover responsive aria-label="Students in course table">
                <thead>
                  <tr>
                    <th>Student Number</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length === 0 ? (
                    <tr><td colSpan="4" className="text-center">No students found</td></tr>
                  ) : (
                    students.map((student) => (
                      <tr key={student._id}>
                        <td>{student.StudentNumber}</td>
                        <td>{student.FirstName}</td>
                        <td>{student.LastName}</td>
                        <td>{student.Email}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default AdminDashboard;
