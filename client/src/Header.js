// Header.js
import React from 'react';

function Header() {
  return (
    <header>
      <div className="header-content">
        <div className="logo">Banking Application</div>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Other</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
