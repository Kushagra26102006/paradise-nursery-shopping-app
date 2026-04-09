import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import AboutUs from './components/AboutUs';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/plants" element={<><Navbar /><ProductList /></>} />
          <Route path="/cart" element={<><Navbar /><CartItem /></>} />
        </Routes>
      </div>
    </Router>
  );
}

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="landing-text">
          <h1>Paradise Nursery</h1>
          <p className="subtitle">Where Green Meets Serenity</p>
          <Link to="/plants">
            <button className="get-started-btn">Get Started</button>
          </Link>
        </div>
        <div className="about-section-landing">
           <AboutUs />
        </div>
      </div>
    </div>
  );
}

export default App;
