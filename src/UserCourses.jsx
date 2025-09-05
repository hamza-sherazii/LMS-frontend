import React, { useEffect, useState } from 'react';
import './app.css';

const UserCourses = () => {

  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');

  const [allowedCourses, setAllowedCourses] = useState([]);
  const [courseVideos, setCourseVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const username = localStorage.getItem('username');

  useEffect(() => {
    if (!username) {
      console.warn("⚠️ No username in localStorage");
      return;
    }

    const fetchUserAccess = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost/lms-api/get-user-access.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username })
        });

        const data = await response.json();

        if (Array.isArray(data.course_access)) {
          setAllowedCourses(data.course_access);
        } else {
          throw new Error('course_access is not an array');
        }
      } catch (err) {
        console.error("❌ Failed to fetch access:", err);
        setError("Failed to load course access");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAccess();
  }, [username]);

  const handleStartLearning = async (course) => {
    try {
      setLoading(true);
      setSelectedCourse(course);

      const response = await fetch(
        `http://localhost/lms-api/get-videos.php?course_name=${encodeURIComponent(course)}`
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch videos');
      }

      setCourseVideos(data.videos || []);
      setCurrentVideo(data.videos[0] || null);
      setShowCourseDetails(true);
    } catch (err) {
      console.error(`❌ Failed to fetch videos for ${course}:`, err);
      setError("Failed to load course videos");
    } finally {
      setLoading(false);
    }
  };

  if (!showCourseDetails) {
    return (
      <div className="user-courses-page" style={{
        padding: '2rem',
        color: '#fff',
        background: '#1a202c',
        minHeight: '100vh'
      }}>
        <header className="page-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => window.location.href = '/'}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
          >
            ←
          </button>
          <h2>Your Enrolled Courses</h2>
        </header>

        {error && (
          <div style={{ color: 'red', margin: '1rem 0' }}>
            Error: {error}
          </div>
        )}

        {loading ? (
          <p>Loading courses...</p>
        ) : allowedCourses.length === 0 ? (
          <p style={{ marginTop: '2rem' }}>
            You don't have access to any courses yet. Please contact your instructor or admin.
          </p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem'
          }}>
            {allowedCourses.map(course => (
              <div
                key={course}
                style={{
                  background: '#2d3748',
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <h3 style={{ marginBottom: '1rem' }}>📘 {course}</h3>
                <p style={{ marginBottom: '1.5rem', color: '#a0aec0' }}>
                  Course content uploaded by the instructor.
                </p>

                <button
                  onClick={() => handleStartLearning(course)}
                  style={{
                    background: '#4299e1',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    marginTop: 'auto',
                    ':hover': {
                      background: '#3182ce'
                    }
                  }}
                >
                  Start Learning
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Course Details View
  return (
    <div className="course-details-page" style={{
      padding: '2rem',
      color: '#fff',
      background: '#1a202c',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <header className="page-header" style={{
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <button
          onClick={() => {
            setShowCourseDetails(false);
            setSelectedCourse('');
            setCurrentVideo(null);
          }}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0.5rem'
          }}
        >
          ←
        </button>
        <h2 style={{ display: 'inline' }}>📘 {selectedCourse}</h2>
      </header>

      <div style={{
        display: 'flex',
        flex: 1,
        gap: '2rem'
      }}>
        {/* Videos List - 30% width */}
        <div style={{
          width: '30%',
          background: '#2d3748',
          borderRadius: '1rem',
          padding: '1.5rem',
          overflowY: 'auto',
          maxHeight: '80vh'
        }}>
          <h3 style={{ marginBottom: '1rem' }}>Course Videos</h3>
          {loading ? (
            <p>Loading videos...</p>
          ) : courseVideos.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {courseVideos.map(video => (
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

        {/* Video Player - 70% width */}
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
                  autoPlay
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
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
              {loading ? 'Loading...' : 'Select a video to start watching'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCourses;