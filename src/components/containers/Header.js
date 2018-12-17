import React, { Component } from 'react';
import { Nav } from '../layout';

class Header extends Component {
  render() {
    return (
      // Header
      <section id="header">
        <div className="container">
          <h1 id="logo">
            Exploring With Friends
          </h1>
          <p>Where will you go?</p>
          <Nav />
        </div>
      </section>
    );
  }
}

export default Header;
