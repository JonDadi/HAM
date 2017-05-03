import React, { Component } from 'react';
import NavBarMenu from './Navbar/navBarMenu';
import { browserHistory } from 'react-router';
import './App.css';
class App extends Component {
  logout(){
    console.log("jó");
    localStorage.setItem("loggedin", false);
    browserHistory.push('/login');
  }
  render() {
    return (
      /*<div className="App">
        <h1> Vikuplan </h1>
        <ScheduleTable scheduleData={this.state.mockData}
                       commonWords={this.state.commonWords}
                       updateScheduleItem={this.updateScheduleItem.bind(this)}/>
      </div>*/
      <div className="fontPage">
        <NavBarMenu />
        <div className="frontPageWrapper">
          <h1>Hugræn Atferlismeðferð!</h1>
          <button onClick={this.logout.bind(this)}>Útskrá</button>
          <p>Vantar efni!!</p>
        </div>
      </div>
    );
  }
}

export default App;
