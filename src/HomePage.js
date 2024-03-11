// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <img src="/logo_e-commerce.png" alt="Logo" className="home-logo" />
        <h1>Welcome to Woven</h1>
      </header>
      <section className="home-about">
        <h2>Your One-Stop Shop for Colorful Comfort</h2>
        <p>At Woven, we specialize in bringing vibrant colors and cozy comfort straight to your wardrobe. 
            Our carefully curated collection features an array of high-quality clothing items designed to suit a variety of styles and preferences. 
            From the luxurious warmth of our knitted sweaters to the classic cool of our caps, each piece in our collection is a celebration of color and craft.</p>
      </section>
      <footer className="home-footer">
        <Link to="/products" className="button">View Products</Link>
      </footer>
    </div>
  );
};

export default HomePage;