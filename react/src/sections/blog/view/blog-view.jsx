import React from 'react';
import { Container, Stack } from '@mui/material';
import Header from 'src/layouts/dashboard/header';

// ----------------------------------------------------------------------

export default function BlogView() {
  return (
    <Container>
      <Header />
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}></Stack>
      <header className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Welcome to Insa Cyber Talent Management</h1>
            <p className="hero-subtitle">Empowering the Next Generation of Cyber Experts</p>
            <a className="cta-button" href="#features">
              Discover More
            </a>
          </div>
          <div className="hero-image">
            <img
              src="/assets/images/covers/background-1.png"
              alt="Hero"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
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
    </Container>
  );
}
