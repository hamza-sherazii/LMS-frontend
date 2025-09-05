import { useState } from 'react';

const Courses = () => {
  const [formData, setFormData] = useState({
    name: '',
    program: 'Starter Plan - 1500 PKR/month',
    requirements: '',
    email: '',
    username: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      setMessage('Password must be at least 8 characters.');
      return;
    }

    let amount = 0;
    let planName = '';
    if (formData.program.includes('Starter')) {
      amount = 1500;
      planName = 'Starter Plan';
    } else if (formData.program.includes('Pro')) {
      amount = 4500;
      planName = 'Pro Learner';
    } else if (formData.program.includes('Elite')) {
      amount = 9999;
      planName = 'Elite Mentor+';
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost/lms-api/lms-form.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          plan: planName,
          amount: amount
        })
      });

      const result = await response.json();

      if (result.message === "Registration successful!") {
        window.location.href = `http://localhost/lms-form/payment.php`;
      } else {
        setMessage(result.message);
      }

    } catch (error) {
      console.error(error);
      setMessage('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="payment-form">
        <h2>LMS Program Enrollment</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
          />

          <select name="program" value={formData.program} onChange={handleChange}>
            <option>Starter Plan - 1500 PKR/month</option>
            <option>Pro Learner - 4500 PKR/month</option>
            <option>Elite Mentor+ - 9,999 PKR/month</option>
          </select>

          <textarea
            name="requirements"
            placeholder="Your learning or mentorship needs..."
            onChange={handleChange}
          ></textarea>

          <input
            type="email"
            name="email"
            placeholder="Contact Email"
            required
            onChange={handleChange}
          />

          <input
            type="text"
            name="username"
            placeholder="Choose a Username"
            required
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Create a Password"
            required
            onChange={handleChange}
          />

          <button
            type="submit"
            className="form-submit-btn"
            disabled={loading}>
            {loading ? 'Processing...' : 'Proceed to payment'}
          </button>

          <button
            type="button"
            className="form-back-home-btn"
            onClick={() => window.location.href = '/'}
          >
            Go Back to Home
          </button>

          {message && <p className="form-message">{message}</p>}
        </form>
      </div>

      <footer className="page-footer">
        <p>© 2023 LMS Platform. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Courses;
