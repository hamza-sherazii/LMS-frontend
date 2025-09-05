import { useState } from 'react';
import Form from './Form';
import LoginMentor from './LoginMentor';

const Mentor = ({ onBack }) => {
    const [activeFaq, setActiveFaq] = useState(null);
    const [currentPage, setCurrentPage] = useState('mentor');

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const navigateTo = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const faqs = [
        {
            question: "How does mentorship work?",
            answer: "You'll get weekly 1:1 sessions with your mentor to review progress and get guidance."
        },
        {
            question: "Can I choose my mentor?",
            answer: "Yes, you can browse mentor profiles and select one that matches your goals."
        },
        {
            question: "Can I schedule my own sessions?",
            answer: "No. You will get one weekly session at a fixed time, every week"
        }
    ];

    if (currentPage === 'Form') return <Form onBack={() => setCurrentPage('mentor')} />;
    if (currentPage === 'LoginMentor') return <LoginMentor onBack={() => setCurrentPage('mentor')} />;

    return (
        <div className="mentor-page">
            <header className="page-header">
            <button
            className="back-button"
            onClick={() => window.location.href = '/'}
          >←</button>
                <h1>Mentorship Program</h1>
            </header>

            <main className="page-main">
                <div className="mentor-intro">
                    <div className="intro-text">
                        <h2>1:1 Career Guidance</h2>
                        <p>Get personalized support from industry experts to accelerate your learning journey.</p>
                        <ul>
                            <li>✅ Weekly 1-hour sessions</li>
                            <li>✅ Career roadmap planning</li>
                            <li>✅ Project code reviews</li>
                        </ul>
                        <div className="mentor-buttons">
                            <button className="enroll-button" onClick={() => navigateTo('Form')}>
                                Find a Mentor
                            </button>
                            <button className="enroll-button" onClick={() => navigateTo('LoginMentor')}>
                                Contact your mentor
                            </button>
                        </div>
                    </div>
                    <div className="video-container">
                        <div className="video-placeholder">
                            <p>[Mentor Program Video]</p>
                        </div>
                    </div>
                </div>

                <section className="reviews">
                    <h3>Success Stories</h3>
                    <div className="review-cards">
                        <div className="review-card">
                            <p>"My mentor helped me land my dream job!"</p>
                            <span>- Taylor, ★★★★★</span>
                        </div>
                        <div className="review-card">
                            <p>"The personalized feedback was invaluable."</p>
                            <span>- Jordan, ★★★★★</span>
                        </div>
                    </div>
                </section>

                <section className="faqs">
                    <h3>Common Questions</h3>
                    <div className="faq-list">
                        {faqs.map((faq, index) => (
                            <div key={index} className="faq-item">
                                <button className="faq-question" onClick={() => toggleFaq(index)}>
                                    {faq.question}
                                    <span>{activeFaq === index ? '−' : '+'}</span>
                                </button>
                                {activeFaq === index && <div className="faq-answer">{faq.answer}</div>}
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

export default Mentor;
