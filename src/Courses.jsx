import { useState } from 'react';
import Form from './Form';
import LoginCourses from './LoginCourses';

const Courses = ({ onBack }) => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [currentPage, setCurrentPage] = useState('courses');

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const faqs = [
    {
      question: "How do I enroll in a course?",
      answer: "Click the 'Enroll Now' button on the course page and follow the payment process."
    },
    {
      question: "Can I access courses offline?",
      answer: "Yes, once enrolled, you can download course materials for offline viewing."
    },
    {
      question: "Is my payment refundable?",
      answer: "No. The payment for courses, once made is not refundable"
    },
  ];

  if (currentPage === 'Form') {
    return <Form onBack={() => setCurrentPage('courses')} />;
  }

  if (currentPage === 'LoginCourses') {
    return <LoginCourses onBack={() => setCurrentPage('courses')} />;
  }

  return (
    <div className="courses-page">
      <header className="page-header">
      <button
            className="back-button"
            onClick={() => window.location.href = '/'}
          >←</button>
        <h1>Our Courses</h1>
      </header>

      <main className="page-main">
        <div className="course-intro">
          <div className="intro-text">
            <h2>Web Development Masterclass</h2>
            <p>Learn full-stack development with modern technologies like React, Node.js, and MongoDB.</p>
            <ul>
              <li>✅ 50+ hours of video content</li>
              <li>✅ 10 real-world projects</li>
              <li>✅ Certificate of completion</li>
            </ul>
            <div className="course-buttons">
              <button className="enroll-button" onClick={() => navigateTo('Form')}>
                Enroll Now
              </button>
              <button className="enroll-button" onClick={() => navigateTo('LoginCourses')}>
                Access your courses
              </button>
            </div>
          </div>
          <div className="video-container">
            <div className="video-placeholder">
              <p>[Course Preview Video]</p>
            </div>
          </div>
        </div>

        <section className="reviews">
          <h3>Student Reviews</h3>
          <div className="review-cards">
            <div className="review-card">
              <p>"This course transformed my career!"</p>
              <span>- Alex, ★★★★★</span>
            </div>
            <div className="review-card">
              <p>"Best investment in my education."</p>
              <span>- Sam, ★★★★★</span>
            </div>
          </div>
        </section>

        <section className="faqs">
          <h3>Frequently Asked Questions</h3>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                >
                  {faq.question}
                  <span>{activeFaq === index ? '−' : '+'}</span>
                </button>
                {activeFaq === index && (
                  <div className="faq-answer">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="page-footer">
        <p>© 2023 LMS Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Courses;
