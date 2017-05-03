import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';


class login extends Component {

  signIn( ) {
    const userName = this.refs.username.value;
    const passwd = this.refs.password.value;


    axios.post('/login', {
      username: userName,
      password: passwd
    })
    .then( res => {
      if(res.data.user){
        console.log("Welcome");
        localStorage.setItem("loggedin", true);
        localStorage.setItem("userName", res.data.user.username);
        browserHistory.push('/');
      } else {
        console.log("Ekki welcome");
      }

    })
    .catch( error => {

      console.log(error);
    });
  }

  render() {
    return (
      <div className='loginPage'>
        <h1>Innskráning</h1>
        <input type='text' title='Notendanafn' ref='username' placeholder='Notendanafn' />
        <input type='password' title='Lykilorð' ref='password' placeholder='Lykilorð' />
        <button title='Innskrá' onClick={this.signIn.bind(this)}> Innskrá </button>
      </div>
    );
  }
}

export default login;
