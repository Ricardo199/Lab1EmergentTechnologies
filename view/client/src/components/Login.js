import React, { useState } from 'react';
import { Card, Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({ studentNumber: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          StudentNumber: credentials.studentNumber,
          Password: credentials.password
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onLogin(data.student);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Connection error. Make sure the server is running.');
    }
    setLoading(false);
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card>
            <Card.Header className="text-center bg-primary text-white">
              <h3>Student Login</h3>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="studentNumber">Student Number</Form.Label>
                  <Form.Control 
                    id="studentNumber"
                    type="text" 
                    placeholder="Enter student number"
                    value={credentials.studentNumber}
                    onChange={(e) => setCredentials({...credentials, studentNumber: e.target.value})}
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
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    required
                    aria-required="true"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
