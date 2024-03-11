import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Make sure you have a Header.css with the desired styles

const Header = () => {
  return (
    <header className="site-header">
      <Link to="/">
        <img src="logo_e-commerce.png" alt="Logo" className="logo" />
      </Link>
      <nav>
        {/* You can add additional navigation links here if needed */}
      </nav>
    </header>
  );
};

export default Header;
