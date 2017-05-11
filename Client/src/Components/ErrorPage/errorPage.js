import React, { Component } from 'react';
import NavBarMenu from '../Navbar/navBarMenu';

class ErrorPage extends Component {
  render() {
    return (
      <div className='errorPage'>
        <NavBarMenu />
        <h1>Þessi síða fannst því miður ekki. </h1>
      </div>
    );
  }
}

export default ErrorPage;
