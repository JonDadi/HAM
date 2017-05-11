import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

const isError = false;
const errorMessage = '';

class login extends Component {
  constructor(props){
    super(props);
    this.state = {
      isError
    };
  }


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
        this.errorMessage = 'Vitlaust lykilorð/notendanafn';
        this.setState({isError: true});
      }

    })
    .catch( error => {

      console.log(error);
    });
  }

  render() {
    if(!this.state.isError){
      return (
        <div className='loginPage'>
          <h1>Innskráning</h1>
          <input type='text' title='Notendanafn' ref='username' placeholder='Notendanafn' />
          <input type='password' title='Lykilorð' ref='password' placeholder='Lykilorð' />
          <p>Áttu ekki notanda? Endilega nýskráðu þig <Link to="/register"> hér!</Link></p>
          <button title='Innskrá' onClick={this.signIn.bind(this)}> Innskrá </button>
        </div>
      );
    } else {
    return (
      <div className='loginPage'>
        <h1>Innskráning</h1>
        <input type='text' title='Notendanafn' ref='username' placeholder='Notendanafn' />
        <input type='password' title='Lykilorð' ref='password' placeholder='Lykilorð' />
        <button title='Innskrá' onClick={this.signIn.bind(this)}> Innskrá </button>
        <p className='errorMsg'>Villa: {this.errorMessage}</p>
      </div>
      );
    }
  }
}

export default login;
