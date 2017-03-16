import React, { Component } from 'react';
import axios from 'axios';
import ActivityItem from './ActivityItem';
import './App.css';

const commonWords = [];
const mockData = [];
let numComponentsEditing = 0;

class ActivityTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      mockData,
      commonWords,
      numComponentsEditing,
    };
  }
  componentDidMount() {
    this.updateActivityTable(  );
  }

  saveAllEdits() {
    for( let key in this.refs ){
      if(!this.refs.hasOwnProperty(key)) {
        continue;
      }
      if(this.refs[key].state.isEditing){
        this.refs[key].saveEdit();
        this.setState({numComponentsEditing: numComponentsEditing--});
      }
    }

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

  updateActivityTable(  ) {
    let newDate = this.refs.pickedDate.value;
    if(!newDate) newDate = this.getTodaysDate();
    console.log('dagsetning valin'+ newDate);
    axios.get('/getActivityItems/'+newDate)
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
  incrementEditingCounter() {
    this.setState({numComponentsEditing: numComponentsEditing++});
  }

  updateActivityItem( newItem ){
    const tmpStateData = this.state.mockData;
    for( let i in tmpStateData){
      if(tmpStateData[i].time === newItem.time){
        tmpStateData[i].content = newItem.content;
        tmpStateData[i].skill = newItem.skill;
        tmpStateData[i].pleasure = newItem.pleasure;
        break;
      }
    }
    this.setState( {mockData: tmpStateData});

    // Save/update the new activityItem on server.
    this.postToServer(newItem);
  }
  postToServer( newActivityItem ) {
    let newDate = this.refs.pickedDate.value;
    if(!newDate) newDate = this.getTodaysDate();
    newActivityItem.date = newDate;
    newActivityItem.userId = 1;
    axios.post('/insertActivityItem', {
      activityItem: newActivityItem,
    })
    .then( res => {
      console.log(res);
    })
    .catch( error => {
      console.log(error);
    })
  }

  render() {
    let activityItemNum = 0;
    const activityItems = this.state.mockData.map( item => {
      return (
        <ActivityItem data={item}
                      updateActivityItem={this.updateActivityItem.bind(this)}
                      commonWords={this.state.commonWords}
                      ref={'ai'+activityItemNum++}
                      isEditing={this.incrementEditingCounter.bind(this)} />
       )
    });

    if(this.state.numComponentsEditing > 1){
      return (

        <div className='activityTable'>
          <input type='date'
                 onChange={this.updateActivityTable.bind(this)}
                 ref='pickedDate'></input>
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
          <button onClick={this.saveAllEdits.bind(this)}>Vista allar færslur</button>
        </div>
      );
    } else {
      return (

        <div className='activityTable'>
        <input type='date'
               onChange={this.updateActivityTable.bind(this)}
               ref='pickedDate'></input>
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
}

export default ActivityTable;
