import React from 'react';

const NavBar = () => {
  return (
    <nav className="nav">
      <h3 className="nav__logo">Coffee App</h3>
      <ul className="nav__links">
        <li className="link"></li>
        <li className="link"></li>
        <li className="link">
          <i className="fa-solid fa-cart-shopping"></i>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
