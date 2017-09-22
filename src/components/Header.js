import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/images/logo.svg';
import SearchBox from '../containers/SearchPage/SearchBox';

class Header extends Component {
  render() {
    return (
      <nav className="navbar is-dark" aria-label="main navigation">
        <div className="container">
          <div className="navbar-menu">
            <div className="navbar-start">
              <div className="navbar-brand">
                <Link to="/" className="navbar-item">
                  <img src={Logo} alt="MovieDB" width="150" height="150" />
                </Link>
            
                <button className="button navbar-burger">
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <SearchBox />
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  } 
} 

export default Header;