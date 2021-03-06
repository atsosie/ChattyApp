import React, { Component } from 'react';

class NavBar extends Component {

  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand"><img className="image" src={ this.props.imageSrc } /></a>
        <span className="userCount">{ this.props.userCount } users online</span>
      </nav>
    );
  }
}

export default NavBar;