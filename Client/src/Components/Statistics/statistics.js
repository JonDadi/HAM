import React, { Component } from 'react';
import Chart from './chart';
import NavBarMenu from '../Navbar/navBarMenu';
import { browserHistory } from 'react-router';
import axios from 'axios';

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
        <label> Hversu marga daga aftur í tímann viltu skoða?
          <input type='number'
            min='1'
            placeholder='1'
            onChange={this.numDaysChanged.bind(this)}
            ref='numDays'/>
        </label>
        <Chart ref='statChart'/>
      </div>
    )
  }
}

export default Statistics;
