import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import ScheduleItem from './ScheduleItem';

const mockData = [];
const commonWords = [];

class ScheduleTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      mockData,
      commonWords,
    };
  }

  componentDidMount(){
    axios.get('/scheduleMockData')
      .then( res => {
        this.setState({mockData: res.data});
      })
      .catch( error => {
        console.log(error);
      })

    axios.get('/commonWords')
      .then( res => {
        this.setState({commonWords: res.data});
      })
      .catch( error =>{
        console.log(error);
      })
  }

  updateScheduleItem( newItem ){
    for( let i in this.state.mockData){
      if(this.state.mockData[i].time === newItem.time){
        this.state.mockData[i].content = newItem.content;
        break;
      }
    }
  }

  render() {
    const scheduleItems = this.state.mockData.map ( item => {
      return (
        <ScheduleItem data={item}
                      commonWords = {this.state.commonWords}
                      updateScheduleItem={this.updateScheduleItem.bind(this)} />
      )
    })

    return (
      <div className='scheduleTable'>
      <h1>Vikuáætlunin mín!</h1>
        <table>
          <tbody>
            <tr>
              <th> Tími </th>
              <th> Lýsing </th>
            </tr>
            {scheduleItems}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ScheduleTable;
