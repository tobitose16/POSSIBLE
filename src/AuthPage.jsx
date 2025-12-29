import React, { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './AuthPage.css';

// Login page only
const AuthPage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage({
        type: 'success',
        text: 'Welcome back! Login successful.',
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <header>
          <h1>Welcome Back</h1>
          <p>Login to your account</p>
        </header>

        {message.text && (
          <div className={`status-msg ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleLogin} className="auth-form login">
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Processing...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
