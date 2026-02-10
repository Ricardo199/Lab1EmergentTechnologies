import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import './App.css';

function App() {
  const [view, setView] = React.useState('student');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setView(userData.Role === 'admin' ? 'admin' : 'student');
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        credentials: 'include'
      });
      setIsLoggedIn(false);
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Student Portal</Navbar.Brand>
          <Nav className="me-auto">
            {(!user?.Role || user.Role === 'student') && (
              <Nav.Link onClick={() => setView('student')} aria-label="Student Dashboard">Student Dashboard</Nav.Link>
            )}
            {user?.Role === 'admin' && (
              <Nav.Link onClick={() => setView('admin')} aria-label="Admin Dashboard">Admin Dashboard</Nav.Link>
            )}
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLogout} aria-label="Logout">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        {view === 'student' && <StudentDashboard studentId={user ? user.StudentId : ''} />}
        {view === 'admin' && <AdminDashboard />}
      </Container>
    </div>
  );
}

export default App;
