import React, { Component } from 'react';
import NavBarMenu from './navBarMenu';

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
        <NavBarMenu />
        <div className="frontPageWrapper">
          <h1>Hugræn Atferlismeðferð!</h1>
          <p>Vantar efni!!</p>
        </div>
      </div>
    );
  }
}

export default App;
