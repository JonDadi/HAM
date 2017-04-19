import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import ScheduleItem from './scheduleItem';

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
    this.updateScheduleTable();
  }

  getTodaysDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
    return yyyy+'-'+mm+'-'+dd;
  }

  updateScheduleTable(  ) {
    let newDate = this.refs.pickedDate.value;
    if(!newDate) newDate = this.getTodaysDate();
    axios.get('/getScheduleItems/'+newDate)
      .then( res => {
        let newData = res.data;
        newData.sort( (a,b) => {
          return parseInt(a.time.substring(0,3)) - parseInt(b.time.substring(0,3));
        })
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
  postToServer( newScheduleItem ) {
    let newDate = this.refs.pickedDate.value;
    if(!newDate) newDate = this.getTodaysDate();
    newScheduleItem.date = newDate;
    newScheduleItem.userId = 1;
    axios.post('/insertScheduleItem', {
      scheduleItem: newScheduleItem,
    }).
    then( res => {
      console.log(res);
    }).
    catch( error => {
      console.log(error);
    })
  }


  updateScheduleItem( newItem ){
    const tmpStateData = this.state.mockData;
    for( let i in tmpStateData){
      if(tmpStateData[i].time === newItem.time){
        tmpStateData[i].content = newItem.content;
        break;
      }
    }
    this.setState( { mockData: tmpStateData });
    this.postToServer( newItem );

  }

  render() {
    let scheduleItemNum = 0;
    const scheduleItems = this.state.mockData.map ( item => {
      return (
        <ScheduleItem data={item}
                      commonWords = {this.state.commonWords}
                      updateScheduleItem={this.updateScheduleItem.bind(this)}
                      ref= {'ai'+scheduleItemNum++} />
      )
    })

    return (
      <div className='scheduleTable'>
      <input type='date'
             onChange={this.updateScheduleTable.bind(this)}
             ref='pickedDate'></input>
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
