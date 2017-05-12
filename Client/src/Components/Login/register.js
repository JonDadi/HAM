import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';



const isError = false;
const errorMessage = '';

class register extends Component {


  constructor(props){
    super(props);
    this.state = {
      isError
    };
  }
  registerUser( ) {
    const userName = this.refs.username.value;
    const passwd = this.refs.password.value;
    const psswd2 = this.refs.passwordAgain.value;
    if(!userName){
      this.errorMessage = 'Verður að fylla út notendanafn!';
      this.setState({isError: true});
    }
    if(!passwd){
      this.errorMessage = 'Verður að velja lykilorð!';
      this.setState({isError: true});
    }


    if(passwd === psswd2){
      axios.post('/register', {
        username: userName,
        password: passwd
      })
      .then( res => {
        if(res.data.user){
          localStorage.setItem("loggedin", true);
          browserHistory.push('/');
        }
      })
      .catch( error => {
        console.log("error");
      });

      this.errorMessage = 'Notandanafn þegar í notkun';
      this.setState({isError: true});

    } else {
      this.errorMessage = 'Lykilorð eru ekki eins.';
      this.setState({isError: true})
    }
  }


  render() {
    if(!this.state.isError){
      return (
        <div className='loginPage'>
          <h1>Nýskráning</h1>
          <input type='text' title='Notendanafn' ref='username' placeholder='Notendanafn' />
          <input type='password' title='Lykilorð' ref='password' placeholder='Lykilorð' />
          <input type='password' title='Endurtekið lykilorð' ref='passwordAgain' placeholder='Lykilorð endurtekið' />
          <button title='Innskrá' onClick={this.registerUser.bind(this)}> Nýskrá </button>
        </div>
      );
    } else {
      return (
        <div className='loginPage'>
          <h1>Nýskráning</h1>
          <input type='text' title='Notendanafn' ref='username' placeholder='Notendanafn' />
          <input type='password' title='Lykilorð' ref='password' placeholder='Lykilorð' />
          <input type='password' title='Endurtekið lykilorð' ref='passwordAgain' placeholder='Lykilorð endurtekið' />
          <button title='Innskrá' onClick={this.registerUser.bind(this)}> Nýskrá </button>
          <p className='errorMsg'>Villa: {this.errorMessage}</p>
        </div>
      );
    }

  }
}

export default register;
