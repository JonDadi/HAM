import React, { Component } from 'react';
import Chart from './chart';
import NavBarMenu from './navBarMenu';

class Statistics extends Component {


  numDaysChanged() {
    const numDays = this.refs.numDays.value;
    this.refs.statChart.changeNumDays( numDays );
  }

  render() {
    return (
      <div className='statisticsWrapper'>
        <NavBarMenu />
        <h1> My statistics </h1>
        <Chart ref='statChart'/>
        <label> Hversu marga daga aftur í tímann viltu skoða?
          <input type='number'
            min='1'
            placeholder='1'
            onChange={this.numDaysChanged.bind(this)}
            ref='numDays'/>
        </label>
      </div>
    )
  }
}

export default Statistics;
