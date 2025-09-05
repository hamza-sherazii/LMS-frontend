import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './app.css';

const CourseDetails = () => {
  const { courseName } = useParams();
  const navigate = useNavigate();
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <div className="course-details-page" style={{ 
      padding: '2rem', 
      color: '#fff', 
      background: '#1a202c', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <header className="page-header" style={{ marginBottom: '2rem' }}>
        <button 
          onClick={() => navigate('/courses')} 
          className="back-button"
          style={{
            background: '#4299e1',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            marginRight: '1rem'
          }}
        >
          ← Back to Courses
        </button>
        <h2 style={{ display: 'inline' }}>📘 {courseName}</h2>
      </header>

      <div style={{ 
        display: 'flex', 
        flex: 1,
        gap: '2rem'
      }}>
        <div style={{ 
          width: '30%',
          background: '#2d3748',
          borderRadius: '1rem',
          padding: '1.5rem',
          overflowY: 'auto',
          maxHeight: '80vh'
        }}>
          <h3 style={{ marginBottom: '1rem' }}>Course Videos</h3>
          {videos.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {videos.map(video => (
                <div
                  key={video.id}
                  onClick={() => setCurrentVideo(video)}
                  style={{
                    padding: '1rem',
                    background: currentVideo?.id === video.id ? '#4a5568' : '#2d3748',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    ':hover': {
                      background: '#4a5568'
                    }
                  }}
                >
                  {video.title}
                </div>
              ))}
            </div>
          ) : (
            <p>No videos available for this course</p>
          )}
        </div>

        <div style={{ 
          width: '70%',
          background: '#2d3748',
          borderRadius: '1rem',
          padding: '1.5rem'
        }}>
          {currentVideo ? (
            <>
              <h3 style={{ marginBottom: '1rem' }}>{currentVideo.title}</h3>
              <div style={{ 
                position: 'relative', 
                paddingBottom: '56.25%', 
                height: 0, 
                overflow: 'hidden',
                borderRadius: '0.5rem',
                background: '#000'
              }}>
                <video
                  key={currentVideo.video_path}
                  src={`http://localhost/lms-api/${currentVideo.video_path}`}
                  controls
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                  }}
                  onError={(e) => {
                    console.error("Video error:", e.target.error);
                    setError("Failed to load video");
                  }}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: '#718096'
            }}>
              <p>Select a video to start watching</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;