import React, { useState } from "react";
import "./AdminStyle.css";

export default function Dashboard() {
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "Intro to React",
      course: "Course 1",
      description: "Getting started with React basics",
      filepath: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 2,
      title: "Advanced CSS",
      course: "Course 2",
      description: "Styling modern web apps",
      filepath: "https://www.w3schools.com/html/movie.mp4",
    },
  ]);

  // Dummy delete
  const handleDelete = (id) => {
    setVideos(videos.filter((v) => v.id !== id));
  };

  // Dummy upload
  const handleUpload = (e) => {
    e.preventDefault();
    const newVideo = {
      id: Date.now(),
      title: "New Dummy Video",
      course: "Course 3",
      description: "Uploaded for demo only",
      filepath: "https://www.w3schools.com/html/mov_bbb.mp4",
    };
    setVideos([newVideo, ...videos]);
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2 className="logo">LMS Admin</h2>
        <nav>
          <ul>
            <li className="active">Dashboard</li>
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
          <div className="stat-card">Total Videos: {videos.length}</div>
          <div className="stat-card">Courses: 15</div>
          <div className="stat-card">Users: —</div>
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
