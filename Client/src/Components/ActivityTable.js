import React, { Component } from 'react';
import axios from 'axios';
import ActivityItem from './ActivityItem';
import './App.css';

const commonWords = [];
const mockData = [];

class ActivityTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      mockData,
      commonWords,
    };
  }
  componentDidMount(){
    axios.get('/activityMockData')
      .then( res => {
        this.setState({mockData: res.data});
      })
      .catch( error =>{
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

  updateActivityItem( newItem ){
    for( let i in this.state.mockData){
      if(this.state.mockData[i].time === newItem.time){
        this.state.mockData[i].content = newItem.content;
        this.state.mockData[i].skill = newItem.skill;
        this.state.mockData[i].pleasure = newItem.pleasure;
        break;
      }
    }
    this.setState( {mockData: this.state.mockData});
  }

  render() {
    const activityItems = this.state.mockData.map( item => {
      return (
        <ActivityItem data={item}
                      updateActivityItem={this.updateActivityItem.bind(this)}
                      commonWords={this.state.commonWords} />
       )
    });

    return (
      <div className='activityTable'>
        <h1>Virknitafla!</h1>
        <table>
          <tbody>
            <tr>
              <th> Tími </th>
              <th> Lýsing </th>
              <th> Virkni </th>
              <th> Ánægja </th>
            </tr>
            {activityItems}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ActivityTable;
