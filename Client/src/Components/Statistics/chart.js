import React, { Component } from 'react';
import axios from 'axios';
import {Line} from 'react-chartjs-2';
import { browserHistory } from 'react-router';

const data = {};

class Chart extends Component {
  constructor( props ) {
    super( props );
    this.state = { data };
  }

  changeNumDays( numDays ) {
    this.updateChart( numDays );
  }

  getNewChartData(newLabels, newSkillData, newPleasureData) {
    return {
      labels: newLabels,
      datasets: [
        {
          label: 'Meðaltal af virkni.',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          data: newSkillData
        },
        {
          label: 'Meðaltal af ánægju.',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(7211,67,18,0.4)',
          borderColor: 'rgba(211,67,18,1)',
          data: newPleasureData
        }
      ]
    };
  }
  updateChart( numDays ) {
    const newLabels = [];
    const newPleasureData = [];
    const newSkillData = [];
    axios.get('/activityStatistics/'+numDays)
    .then( res => {
      res.data.map(item => {
        newLabels.push(item.date.substring(0,10));
        newPleasureData.push( parseInt(item.avg_pleasure) );
        newSkillData.push( parseInt(item.avg_skill) );
      })
      this.setState({ data: this.getNewChartData( newLabels, newSkillData, newPleasureData )});
    })
    .catch(error => {
      if(error.response.status === 303) {
        // User is not logged in on server
        browserHistory.push('/login');
      }
    })
  }
  componentWillMount() {
      this.updateChart(7);
  }
  render() {
    return (
        <Line data={this.state.data}
          width={100}
          height={100}
           options={{
              maintainAspectRatio: false
           }}
         />
    )
  }
}

export default Chart;
