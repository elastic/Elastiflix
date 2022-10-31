import React from 'react';
import TmdbLogo from '../tmdb-logo.svg';

const Layout = ({children}) => 
  <div>
    {children}
    <div className="footer">Credits: This product uses the TMDB API but is not endorsed or certified by TMDB.</div>
    <div className="footer-logo">
    <img
        className="nav__logo"
        src={TmdbLogo}
        alt=""
    /></div>
  </div>;


export default Layout;
