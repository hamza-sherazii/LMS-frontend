import { useState } from 'react';
import UserMentor from './UserMentor';
import Form from './Form';

const LoginMentor = ({ onBack }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [registerMode, setRegisterMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSuccess = () => setLoggedIn(true);
  const goToRegister = () => setRegisterMode(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/lms-api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.success) handleSuccess();
      else setMessage(data.message);
    } catch {
      setMessage("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loggedIn) return <UserMentor />;
  if (registerMode) return <Form onBack={() => setRegisterMode(false)} />;

  return (
    <div className="login-form">
      <h2>User Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="form-message">{message}</p>
        <p>
          Don't have an account?{" "}
          <a href="#" onClick={(e) => { e.preventDefault(); goToRegister(); }} className="link-btn">
            Register Now!
          </a>
        </p>
        <button type="button" onClick={onBack} className="login-back-button">← Back</button>
      </form>
    </div>
  );
};

export default LoginMentor;
