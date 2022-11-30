import { bool, shape } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.css';

export default function Navbar(props) {
  const { auth: { isLoggedIn } } = props;
  return (
    <header>
      <nav id="navbar">
        <Link to="/">Home</Link>
        {
          !isLoggedIn ? null : (
            <>
              <Link to="/draw">Draw</Link>
              <Link to="/gallery">Gallery</Link>
            </>
          )
        }
      </nav>
    </header>
  );
}
Navbar.defaultProps = {
  auth: {
    isLoggedIn: false,
  },
};
Navbar.propTypes = {
  auth: shape({
    isLoggedIn: bool,
  }),
};
