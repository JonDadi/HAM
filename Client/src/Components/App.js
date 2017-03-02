import React, { Component } from 'react';
import './App.css';

class App extends Component {

  render() {
    return (
      /*<div className="App">
        <h1> Vikuplan </h1>
        <ScheduleTable scheduleData={this.state.mockData}
                       commonWords={this.state.commonWords}
                       updateScheduleItem={this.updateScheduleItem.bind(this)}/>
      </div>*/
      <div className="fontPage">
        <h1>Hugræn Atferlismeðferð!</h1>
        <a href="/activityTable">Virknitaflan mín</a>
        <br />
        <a href="/scheduleTable">Vikuáætlunin mín</a>
      </div>
    );
  }
}

export default App;
