import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';


class logout extends Component {

  componentWillMount( ) {
    axios.get('/logout')
    .then( res => {
        localStorage.setItem("loggedin", false);
        browserHistory.push('/login');
    })
    .catch( error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className='loginPage'>
        <h1></h1>
      </div>
    );
  }
}

export default logout;
