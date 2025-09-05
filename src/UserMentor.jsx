import React from 'react';
import './app.css';

const UserMentor = ({ onBack }) => {
  return (
    <div className="user-mentor-page" style={{ padding: '2rem', color: '#fff', background: '#1a202c', minHeight: '100vh' }}>

      <header className="page-header">
      <button onClick={() => window.location.href = '/'} className="back-button">←</button>
        <h2>Your Mentorship Panel</h2>
      </header>

      <div style={{
        background: '#2d3748',
        padding: '1.5rem',
        borderRadius: '1rem',
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
      }}>
        <h3>👨‍🏫 Saad Rehman</h3>
        <p>Next session: Friday, 6 PM<br />Topics: Git, Node.js & portfolio feedback</p>
        <button style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          background: '#805ad5',
          border: 'none',
          borderRadius: '0.5rem',
          color: '#fff'
        }}>
          Join Zoom
        </button>
      </div>
    </div>
  );
};

export default UserMentor;
