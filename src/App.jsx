import { useState, useEffect, useRef } from 'react';
import Courses from './Courses';
import Mentor from './Mentor';
import Form from './Form';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const animationRefs = useRef([]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);    
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            if (entry.target.classList.contains('hero-stats-card')) {
              const counter = entry.target.querySelector('.stats-number');
              if (counter) {
                animateCounter(counter);
              }
            }
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    animationRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    const animateCounter = (element) => {
      const target = parseInt(element.getAttribute('data-target'));
      const duration = 2000;
      const start = 0;
      const increment = target / (duration / 16); 

      const updateCounter = () => {
        const current = parseInt(element.textContent);
        if (current < target) {
          element.textContent = Math.min(Math.ceil(current + increment), target);
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = target.toLocaleString() + '+';
        }
      };

      updateCounter();
    };

    return () => {
      animationRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !animationRefs.current.includes(el)) {
      animationRefs.current.push(el);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'courses':
        return <Courses onBack={() => navigateTo('home')} />;
      case 'mentor':
        return <Mentor onBack={() => navigateTo('home')} />;
      case 'Form':
        return <Form onBack={() => navigateTo('home')} />;
      default:
        return (
          <div className="app">
            <header className="header">
              <div className="brand">
                <img src='/logo.png' className='brand-logo' alt="Logo" />
              </div>

              <button className="menu-toggle" onClick={toggleMenu}>
                ☰
              </button>

              <nav className={menuOpen ? 'open' : ''}>
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#courses">Courses</a>
                <a href="#plans">Plans</a>
              </nav>

              <div className="search-bar">
                <input type="text" placeholder="Search..." />
                <button type="submit">🔍</button>
              </div>
            </header>

            <section className="hero-section" id="home">
              <div className="hero-text slide-in-left" ref={addToRefs}>
                <h1>Welcome to our <span>LMS website</span></h1>
                <h2>Empower Your Learning Journey.</h2>
                <p>
                  Explore a rich library of expert-led courses combined with personalized
                  mentorship designed to keep you on track. Whether you're upskilling,
                  starting fresh, or chasing your dream career, our platform gives you the
                  content, support, and confidence to get there, your way.
                </p>
                <button className="hero-btn" onClick={() => navigateTo('courses')}>Start Learning Today!</button>
              </div>
              <div className="hero-img slide-in-right" ref={addToRefs}>
                <img src='/hero-img.png' alt="Learning illustration" />

                <div className="hero-stats-card left-stats fade-up" ref={addToRefs}>
                  <div className="stats-icon">👨‍🎓</div>
                  <div className="stats-number" data-target="10000">0</div>
                  <div className="stats-label">Trusted Students</div>
                </div>

                <div className="hero-stats-card right-stats fade-up" ref={addToRefs}>
                  <div className="stats-icon">🎥</div>
                  <div className="stats-number" data-target="500">0</div>
                  <div className="stats-label">Hours of Uploaded Video Data</div>
                </div>
              </div>
            </section>

            <section className="about-section" id="about">
              <div className="about-text fade-up" ref={addToRefs}>
                <h1>What We Do?</h1>
                <p>
                  We provide cutting-edge learning experiences with industry-aligned curriculum,
                  hands-on projects, and personalized career support to help you achieve your goals.
                </p>
                <div className="about-cards">
                  <div className="about-card fade-up" ref={addToRefs}>🎓 200+ Expert-led courses</div>
                  <div className="about-card fade-up" ref={addToRefs}>🤝 500+ Industry mentors</div>
                </div>
                <div className="about-cards">
                  <div className="about-card fade-up" ref={addToRefs}>🧠 10,000+ Happy students</div>
                  <div className="about-card fade-up" ref={addToRefs}>🌐 24/7 Learning access</div>
                </div>
              </div>
              <div className="about-img slide-in-right" ref={addToRefs}>
                <img src='/about-img.png' alt="About our platform" />
              </div>
            </section>

            <section className="course-section" id="courses">
              <div className="container">
                <div className="section-header fade-up" ref={addToRefs}>
                  <h1 className="section-title">Learn & Grow Faster</h1>
                  <p className="section-subtitle">Quality courses and expert mentorship to accelerate your journey</p>
                </div>
                <div className="cards-container">
                  <div className="course-card fade-up" ref={addToRefs}>
                    <div className="card-content">
                      <div className="card-icon">📚</div>
                      <h3 className="card-title">Comprehensive Courses</h3>
                      <p className="card-description">
                        Access 200+ courses across 15 categories with:
                      </p>
                      <ul>
                        <li>Interactive coding exercises</li>
                        <li>Real-world projects</li>
                        <li>Industry-recognized certificates</li>
                      </ul>
                    </div>
                    <div className="card-footer">
                      <button
                        className="card-button"
                        onClick={() => navigateTo('courses')}
                      >
                        Browse All Courses →
                      </button>
                    </div>
                  </div>

                  <div className="mentor-card fade-up" ref={addToRefs}>
                    <div className="card-content">
                      <div className="card-icon">👨‍🏫</div>
                      <h3 className="card-title">Expert Mentorship</h3>
                      <p className="card-description">
                        Get personalized guidance with:
                      </p>
                      <ul>
                        <li>1:1 weekly sessions</li>
                        <li>Career path planning</li>
                        <li>Code reviews & feedback</li>
                        <li>Interview preparation</li>
                      </ul>
                    </div>
                    <div className="card-footer">
                      <button
                        className="card-button"
                        onClick={() => navigateTo('mentor')}
                      >
                        Find Your Mentor →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section id="plans" className="pricing-section">
              <h1 className="fade-up" ref={addToRefs}><span>Enroll</span> and Start learning today</h1>
              <div className="pricing-cards">
                <div className="starter-plan-card pricing-card slide-in-right" ref={addToRefs}>
                  <h2>Starter Plan</h2>
                  <p className="price">PKR 1,500 / month</p>
                  <ul>
                    <li>✔️ Access to 5 beginner courses</li>
                    <li>✔️ Community Q&A forums</li>
                    <li>✔️ Monthly learning newsletter</li>
                    <li>✔️ Limited progress tracking</li>
                  </ul>
                  <button className="enroll-btn"
                    onClick={() => navigateTo('Form')}>
                    Enroll Now</button>
                </div>

                <div className="pro-plan-card pricing-card fade-up" ref={addToRefs}>
                  <h2>Pro Learner</h2>
                  <p className="price">PKR 4,500 / month</p>
                  <ul>
                    <li>✔️ Access to all standard courses</li>
                    <li>✔️ Group mentorship sessions</li>
                    <li>✔️ Full progress tracking</li>
                    <li>✔️ Course completion certificates</li>
                    <li>✔️ Priority support</li>
                  </ul>
                  <button className="enroll-btn"
                    onClick={() => navigateTo('Form')}>
                    Enroll Now</button>
                </div>

                <div className="elite-plan-card pricing-card slide-in-left" ref={addToRefs}>
                  <h2>Elite Mentor+</h2>
                  <p className="price">PKR 9,999 / month</p>
                  <ul>
                    <li>✔️ All features in Pro Learner</li>
                    <li>✔️ 1-on-1 mentorship with experts</li>
                    <li>✔️ Access to premium masterclasses</li>
                    <li>✔️ Personalized learning roadmap</li>
                    <li>✔️ Lifetime course access</li>
                    <li>✔️ Direct chat with mentors</li>
                  </ul>
                  <button className="enroll-btn"
                    onClick={() => navigateTo('Form')}>
                    Enroll Now</button>
                </div>
              </div>
            </section>
            <footer className="footer">
              <div className="footer-container">
                <div className="footer-section">
                  <h3>About LMS</h3>
                  <p>
                    LMS is your all-in-one learning platform
                    offering high-quality courses,
                    expert mentorship, and personalized
                    career support to help you grow faster
                    and smarter.
                  </p>
                </div>
                <div className="footer-responsive">
                  <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                      <li><a href="#home">🏠 Home</a></li>
                      <li><a href="#about">ℹ️ About</a></li>
                      <li><a href="#courses">📚 Courses</a></li>
                      <li><a href="#plans">💸 Plans</a></li>
                    </ul>
                  </div>

                  <div className="footer-section">
                    <h3>Contact</h3>
                    <ul>
                      <li>📧 support@lms.pk</li>
                      <li>📞 +92 300 1234567</li>
                      <li>📍 Lahore, Pakistan</li>
                    </ul>
                  </div>

                  <div className="footer-section">
                    <h3>Follow Us</h3>
                    <ul className="footer-social-list">
                      <li>
                        <a href="https://facebook.com" target="_blank" rel="noreferrer">
                          <i className="fab fa-facebook-f"></i> Facebook
                        </a>
                      </li>
                      <li>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer">
                          <i className="fab fa-instagram"></i> Instagram
                        </a>
                      </li>
                      <li>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer">
                          <i className="fab fa-twitter"></i> Twitter
                        </a>
                      </li>
                      <li>
                        <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer">
                          <i className="fab fa-whatsapp"></i> WhatsApp
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="footer-bottom">
                <p>© {new Date().getFullYear()} LMS. All rights reserved.</p>
              </div>
            </footer>
          </div>
        );
    }
  };

  return renderPage();
}

export default App;