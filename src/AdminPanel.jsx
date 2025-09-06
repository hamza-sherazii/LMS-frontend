import React, { useState } from "react";
import "./AdminStyle.css";

export default function Dashboard() {
  const [videos, setVideos] = useState([]);
  
  const handleUpload = (e) => {
    e.preventDefault();
    alert("Upload functionality not implemented yet!");
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2 className="logo">LMS Admin</h2>
        <nav>
          <ul>
            <li className="active">Dashboard</li>
            <li>Manage Insights</li>
            <li>Manage Videos</li>
            <li>Manage Users</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1>Dashboard</h1>
        </header>

        <section className="stats">
          <div className="stat-card">Total Videos: 63</div>
          <div className="stat-card">Courses: 15</div>
          <div className="stat-card">Users: 1204</div>
        </section>

        <section className="upload-section">
          <h2>Upload New Video</h2>
          <form onSubmit={handleUpload} className="upload-form">
            <input type="text" placeholder="Video Title" required />
            <select required>
              {[...Array(15)].map((_, i) => (
                <option key={i}>Course {i + 1}</option>
              ))}
            </select>
            <textarea placeholder="Description"></textarea>
            <input type="file" accept="video/*" />
            <button type="submit">Upload</button>
          </form>
        </section>
      </main>
    </div>
  );
}
