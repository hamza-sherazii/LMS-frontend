import { useState } from 'react';
import AdminPanel from './AdminPanel';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost/lms-api/admin-login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      if (data.success) {
        setLoggedIn(true); 
      } else {
        setError('Invalid login. Try again.');
      }
    } catch (err) {
      setError('Server error. Please try again.');
      console.error(err);
    }
  };

  if (loggedIn) return <AdminPanel />;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Admin Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input
          type="text"
          placeholder="Username"
          style={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} style={styles.button}>Login</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: '#1a202c',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    background: '#2d3748',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    color: '#edf2f7',
  },
  title: {
    margin: 0,
    fontSize: '24px',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    textAlign: 'center',
  },
  input: {
    padding: '10px',
    border: '1px solid #4a5568',
    borderRadius: '6px',
    background: '#1a202c',
    color: '#edf2f7',
  },
  button: {
    padding: '10px',
    background: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  }
};
