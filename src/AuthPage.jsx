import React, { useState } from 'react';
import { auth, db } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Hexagon, Moon, Play, ArrowRight, BarChart2, Mic, Globe, Users, CheckCircle, Shield } from 'lucide-react';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage({ type: 'success', text: 'Login successful.' });
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, 'users', user.uid), {
          company: company || 'Nexus Industries',
          email: email,
          joinedAt: new Date().toISOString(),
        });
        setMessage({ type: 'success', text: 'Account created! You can now login.' });
        setIsLogin(true);
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-wrapper">
      {/* Navbar */}
      <nav className="landing-nav">
        <div className="nav-logo">
          <div className="logo-icon-container">
            <Hexagon className="logo-icon" size={24} fill="#3b82f6" color="#3b82f6" />
          </div>
          <span className="logo-text">AutoConnect AI</span>
        </div>
        <div className="nav-links">
          <a href="#">Features</a>
          <a href="#">Process</a>
          <a href="#">Industries</a>
        </div>
        <div className="nav-actions">
          <button className="nav-text-btn" onClick={() => setIsLogin(true)}>Sign In</button>
          <button className="nav-btn-dark" onClick={() => setIsLogin(false)}>Get Started</button>
          <button className="theme-toggle"><Moon size={18} /></button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">
          <span className="dot"></span> Intelligent Sales Automation
        </div>
        <h1 className="hero-title">
          AI Sales & Lead<br />
          <span className="hero-title-ghost">Outreach Agent</span>
          <span className="hero-title-overlay">Outreach Agent</span>
        </h1>
        <p className="hero-subtitle">
          Automate multilingual lead conversations using emotion-aware AI<br />
          voice agents. Improve customer engagement and conversion with<br />
          intelligent voice automation.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary">Get Started Free</button>
          <button className="btn-secondary">Request Demo <ArrowRight size={16} /></button>
        </div>
      </section>

      {/* Dashboard Mockup */}
      <section className="mockup-section">
        <div className="mockup-container">
          <div className="mockup-header">
            <div className="window-controls">
              <div className="dot red"></div><div className="dot yellow"></div><div className="dot green"></div>
            </div>
            <div className="url-bar">autoconnect.ai/dashboard</div>
            <div className="live-status"><div className="ping"></div> LIVE</div>
          </div>
          <div className="mockup-body">
            <h2>Connect Your Workforce</h2>
            <p>Real-time outreach tracking enabled</p>
            <div className="mockup-stats">
              <div className="mockup-stat-card border-blue">
                <span className="stat-label">CALLS ACTIVE</span>
                <span className="stat-value">1,240</span>
              </div>
              <div className="mockup-stat-card border-green">
                <span className="stat-label">SUCCESS RATE</span>
                <span className="stat-value text-green">85%</span>
              </div>
              <div className="mockup-stat-card border-purple">
                <span className="stat-label">LEADS GENERATED</span>
                <span className="stat-value">328</span>
              </div>
            </div>
            <div className="mockup-footer">
              <div className="audio-wave">
                <div className="bar"></div><div className="bar"></div><div className="bar"></div><div className="bar"></div>
              </div>
              <span>AI Active Processing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Area */}
      <section className="partners-section">
        <p className="partners-title">TRUSTED BY INDUSTRY LEADERS</p>
        <div className="partners-logos">
          <span className="partner"><Shield size={18} /> Nexus</span>
          <span className="partner"><BarChart2 size={18} /> EnergyCo</span>
          <span className="partner"><Hexagon size={18} /> Lotus</span>
          <span className="partner"><Globe size={18} /> GlobalNet</span>
          <span className="partner"><CheckCircle size={18} /> Stratos</span>
        </div>
      </section>

      {/* Features Area */}
      <section className="features-section">
        <h2>Why Choose <span className="text-blue">AutoConnect?</span></h2>
        <p className="features-subtitle">Our platform empowers your sales team with cutting-edge AI technology<br />designed for scale and efficiency.</p>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper bg-blue-light">
              <Mic size={24} color="#3b82f6" />
            </div>
            <h3>Emotion-Aware Voice</h3>
            <p>AI agents that detect sentiment and adjust tone in real-time for human-like conversations.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper bg-purple-light">
              <Globe size={24} color="#a855f7" />
            </div>
            <h3>Multilingual Support</h3>
            <p>Instantly break language barriers with support for over 50 languages and local dialects.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper bg-green-light">
              <BarChart2 size={24} color="#22c55e" />
            </div>
            <h3>Real-time Analytics</h3>
            <p>Track performance, conversion rates, and call quality instantly from your dashboard.</p>
          </div>
        </div>
      </section>

      {/* Auth Area */}
      <section className="auth-section" id="auth">
        <div className="auth-container">

          {/* Left side: Form */}
          <div className="auth-form-side">
            <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="auth-subtitle">{isLogin ? 'Login to your specialized AI dashboard' : 'Join the leader in AI voice automation'}</p>

            {message.text && (
              <div className={`status-msg ${message.type}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleAuth} className="auth-form">
              {!isLogin && (
                <div className="form-group">
                  <label>COMPANY OR TEAM</label>
                  <input type="text" placeholder="Nexus Industries" value={company} onChange={(e) => setCompany(e.target.value)} required />
                </div>
              )}
              <div className="form-group">
                <label>EMAIL</label>
                <input type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>PASSWORD</label>
                <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="btn-primary full-width mt-4" disabled={loading}>
                {loading ? 'Processing...' : (isLogin ? 'Login to Dashboard' : 'Sign Up')}
              </button>
            </form>

            <p className="auth-switch">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button type="button" onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Sign Up' : 'Log In'}</button>
            </p>
          </div>

          {/* Right side: Info */}
          <div className="auth-info-side">
            <div className="auth-info-content">
              <div className="auth-info-icon">
                <Hexagon size={32} fill="#3b82f6" color="white" />
              </div>
              <h2>AutoConnect AI</h2>
              <p>Enterprise-grade voice automation at your fingertips.</p>

              <div className="mock-user-card mt-6">
                <div className="mock-card-icon bg-blue-light"><Users size={18} color="#3b82f6" /></div>
                <div>
                  <div className="mock-card-label">COMPANY</div>
                  <div className="mock-card-value">{company || 'Nexus Industries'}</div>
                </div>
              </div>
              <div className="mock-user-card mt-3">
                <div className="mock-card-icon bg-purple-light"><Mail size={18} color="#a855f7" /></div>
                <div>
                  <div className="mock-card-label">USER</div>
                  <div className="mock-card-value">{email || 'admin@autoconnect.ai'}</div>
                </div>
              </div>

              <button className="btn-dark full-width mt-6">
                Create Master Account <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-left">
            <div className="nav-logo">
              <Hexagon size={20} fill="#3b82f6" color="#3b82f6" />
              <span className="logo-text">AutoConnect AI</span>
            </div>
            <p className="footer-desc mt-2">Transforming sales outreach with intelligent, emotion-aware AI agents. The future of connection is here.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Platform</h4>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Integrations</a>
              <a href="#">API</a>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <a href="#">Blog</a>
              <a href="#">Case Studies</a>
              <a href="#">Documentation</a>
              <a href="#">Community</a>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Security</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2024 AutoConnect AI. All rights reserved.</span>
          <span>Designed for the future.</span>
        </div>
      </footer>
    </div>
  );
};

const Mail = ({ size, color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

export default AuthPage;
