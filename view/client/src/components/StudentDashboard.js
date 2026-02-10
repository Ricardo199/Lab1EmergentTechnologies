import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Button, Table, Alert, Spinner } from 'react-bootstrap';

function StudentDashboard() {
  const [studentId, setStudentId] = useState('');
  const [selectedView, setSelectedView] = useState('myCourses');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({ CourseCode: '', CourseSection: '' });

  useEffect(() => {
    if (studentId && selectedView === 'myCourses') {
      fetchStudentCourses();
    }
  }, [studentId, selectedView]);

  const fetchStudentCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/students/${studentId}`);
      const data = await response.json();
      setCourses(data.EnroledCourses || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/students/${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          EnroledCourses: [...courses, formData]
        })
      });
      if (response.ok) {
        setSuccess('Course added successfully!');
        setFormData({ CourseCode: '', CourseSection: '' });
        fetchStudentCourses();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    try {
      const updatedCourses = courses.map(c => 
        c.CourseCode === formData.CourseCode ? { ...c, CourseSection: formData.CourseSection } : c
      );
      const response = await fetch(`http://localhost:5000/api/students/${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ EnroledCourses: updatedCourses })
      });
      if (response.ok) {
        setSuccess('Course updated successfully!');
        fetchStudentCourses();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDropCourse = async (e) => {
    e.preventDefault();
    try {
      const updatedCourses = courses.filter(c => c.CourseCode !== formData.CourseCode);
      const response = await fetch(`http://localhost:5000/api/students/${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ EnroledCourses: updatedCourses })
      });
      if (response.ok) {
        setSuccess('Course dropped successfully!');
        setFormData({ CourseCode: '', CourseSection: '' });
        fetchStudentCourses();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Student Dashboard</h2>
      
      {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess(null)} dismissible>{success}</Alert>}
      
      <Card className="mb-4">
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="studentId">Student ID</Form.Label>
            <Form.Control 
              id="studentId" 
              type="text" 
              placeholder="Enter your student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              aria-required="true"
            />
          </Form.Group>
        </Card.Body>
      </Card>

      <Row className="mb-3">
        <Col>
          <Button variant="primary" onClick={() => setSelectedView('myCourses')} className="me-2">My Courses</Button>
          <Button variant="success" onClick={() => setSelectedView('addCourse')} className="me-2">Add Course</Button>
          <Button variant="warning" onClick={() => setSelectedView('updateCourse')} className="me-2">Update Course</Button>
          <Button variant="danger" onClick={() => setSelectedView('dropCourse')}>Drop Course</Button>
        </Col>
      </Row>

      {selectedView === 'myCourses' && (
        <Card>
          <Card.Header>My Courses</Card.Header>
          <Card.Body>
            {loading ? <Spinner animation="border" /> : (
              <Table striped bordered hover responsive aria-label="My courses table">
                <thead>
                  <tr>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Section</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.length === 0 ? (
                    <tr><td colSpan="3" className="text-center">No courses enrolled</td></tr>
                  ) : (
                    courses.map((course, idx) => (
                      <tr key={idx}>
                        <td>{course.CourseCode}</td>
                        <td>{course.CourseName}</td>
                        <td>{course.CourseSection}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      )}

      {selectedView === 'addCourse' && (
        <Card>
          <Card.Header>Add Course</Card.Header>
          <Card.Body>
            <Form onSubmit={handleAddCourse}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="courseCode">Course Code</Form.Label>
                <Form.Control 
                  id="courseCode" 
                  type="text" 
                  placeholder="e.g., COMP3123" 
                  value={formData.CourseCode}
                  onChange={(e) => setFormData({...formData, CourseCode: e.target.value})}
                  aria-required="true" 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="courseSection">Section</Form.Label>
                <Form.Control 
                  id="courseSection" 
                  type="text" 
                  placeholder="e.g., 001" 
                  value={formData.CourseSection}
                  onChange={(e) => setFormData({...formData, CourseSection: e.target.value})}
                  aria-required="true" 
                />
              </Form.Group>
              <Button variant="primary" type="submit">Add Course</Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      {selectedView === 'updateCourse' && (
        <Card>
          <Card.Header>Update Course</Card.Header>
          <Card.Body>
            <Form onSubmit={handleUpdateCourse}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="updateCourseCode">Course Code</Form.Label>
                <Form.Control 
                  id="updateCourseCode" 
                  type="text" 
                  placeholder="Enter course code" 
                  value={formData.CourseCode}
                  onChange={(e) => setFormData({...formData, CourseCode: e.target.value})}
                  aria-required="true" 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="newSection">New Section</Form.Label>
                <Form.Control 
                  id="newSection" 
                  type="text" 
                  placeholder="Enter new section" 
                  value={formData.CourseSection}
                  onChange={(e) => setFormData({...formData, CourseSection: e.target.value})}
                  aria-required="true" 
                />
              </Form.Group>
              <Button variant="warning" type="submit">Update Course</Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      {selectedView === 'dropCourse' && (
        <Card>
          <Card.Header>Drop Course</Card.Header>
          <Card.Body>
            <Form onSubmit={handleDropCourse}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="dropCourseCode">Course Code</Form.Label>
                <Form.Control 
                  id="dropCourseCode" 
                  type="text" 
                  placeholder="Enter course code to drop" 
                  value={formData.CourseCode}
                  onChange={(e) => setFormData({...formData, CourseCode: e.target.value})}
                  aria-required="true" 
                />
              </Form.Group>
              <Button variant="danger" type="submit">Drop Course</Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default StudentDashboard;
