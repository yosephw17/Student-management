// src/HomePage.jsx
import React from 'react';
import './HomePage.css'; // Import the CSS file
import Header from 'src/layouts/dashboard/header';
const HomePage = () => {
  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />
      <div className="home-page">
        <header className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to Insa Cyber Talent Management</h1>
            <p className="hero-subtitle">Empowering the Next Generation of Cyber Experts</p>
            <a className="cta-button" href="#features">
              Discover More
            </a>
          </div>
        </header>
        <section id="features" className="features-section">
          <div className="container">
            <h2 className="section-title">Platform Features</h2>
            <div className="features">
              <div className="feature">
                <h3>Advanced Skill Tracking</h3>
                <p>Monitor your progress and skill development with advanced tracking tools.</p>
              </div>
              <div className="feature">
                <h3>Real-World Projects</h3>
                <p>Engage in projects that mirror real-world cyber challenges and scenarios.</p>
              </div>
              <div className="feature">
                <h3>Expert Guidance</h3>
                <p>Get advice and mentorship from industry experts to enhance your cyber skills.</p>
              </div>
            </div>
          </div>
        </section>
        <footer className="footer">
          <div className="container">
            <p>&copy; 2024 Insa Cyber Talent Management. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
