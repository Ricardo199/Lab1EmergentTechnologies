import React, { useState } from 'react';
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';

function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({ studentNumber: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
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
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="studentNumber">Student Number</Form.Label>
                  <Form.Control 
                    id="studentNumber"
                    type="text" 
                    placeholder="Enter student number"
                    value={credentials.studentNumber}
                    onChange={(e) => setCredentials({...credentials, studentNumber: e.target.value})}
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
                    aria-required="true"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Login
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
