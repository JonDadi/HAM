import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';

class register extends Component {

  registerUser( ) {
    const userName = this.refs.username.value;
    const passwd = this.refs.password.value;


    axios.post('/register', {
      username: userName,
      password: passwd
    })
    .then( res => {
      if(res.data.user){
        console.log("Welcome");
        localStorage.setItem("loggedin", true);
        browserHistory.push('/');
      } else {
        console.log("Ekki welcome");
      }
    })
    .catch( error => {


    });
  }


  render() {
    return (
      <div className='loginPage'>
        <h1>Nýskráning</h1>
        <input type='text' title='Notendanafn' ref='username' placeholder='Notendanafn' />
        <input type='password' title='Lykilorð' ref='password' placeholder='Lykilorð' />
        <input type='password' title='Endurtekið lykilorð' ref='passwordAgain' placeholder='Lykilorð endurtekið' />
        <button title='Innskrá' onClick={this.registerUser.bind(this)}> Nýskrá </button>
      </div>
    );
  }
}

export default register;
