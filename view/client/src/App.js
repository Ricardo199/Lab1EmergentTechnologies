import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import './App.css';

function App() {
  const [view, setView] = React.useState('student');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        credentials: 'include'
      });
      setIsLoggedIn(false);
    } catch (err) {
      console.error('Logout error:', err);
      setIsLoggedIn(false);
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Student Portal</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => setView('student')} aria-label="Student view">Student</Nav.Link>
            <Nav.Link onClick={() => setView('admin')} aria-label="Admin view">Admin</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLogout} aria-label="Logout">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        {view === 'student' && <StudentDashboard />}
        {view === 'admin' && <AdminDashboard />}
      </Container>
    </div>
  );
}

export default App;
