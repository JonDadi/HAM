import React, { Component } from 'react';
import axios from 'axios';
import ActivityItem from './activityItem';
import NavBarMenu from '../Navbar/navBarMenu';
import { Table } from 'react-bootstrap';
import Calendar from './calendar';
import moment from 'moment';
import { browserHistory } from 'react-router';


const commonWords = [];
const mockData = [];
const isInFuture = false;
let numComponentsEditing = 0;

class ActivityTable extends Component {
  componentWillMount(){
    const isLoggedIn = localStorage.getItem("loggedin");
    if(!isLoggedIn) {
      console.log("redirect");
      browserHistory.push('/login');
    }
  }
  constructor(props){
    super(props);
    console.log("Bý til activity table");
    this.state = {
      mockData,
      commonWords,
      numComponentsEditing,
    };
  }

  componentDidMount() {
    this.updateActivityTable(  );
  }
 // hvar sofa brauðin?
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
    var mm = today.getMonth()+1;
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
    axios.get('/commonWords')
      let newCommonWords = [];
      .then( res => {
        if(res.data.length < 1 ) {
          newCommonWords = ['x'];
        } else {
          newCommonWords = res.data;
        }
        this.setState({commonWords: newCommonWords});
      })
      .catch( error =>{
        if(error.response.status === 303) {
          // User is not logged in on server
          browserHistory.push('/login');
        }
    })
    axios.get('/getActivityItems/'+newDate)
      .then( res => {
        let newData = res.data;
        newData.sort( (a,b) => {
          return parseInt(a.time.substring(0,3)) - parseInt(b.time.substring(0,3));
        })
        this.isInFuture = !moment().isAfter(newDate)
        this.setState({mockData: res.data});
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
    //this.setState( {mockData: tmpStateData});
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
                      isEditing={this.incrementEditingCounter.bind(this)}
                      isInFuture={this.isInFuture} />
       )
    });
    if(this.isInFuture){
      return (
          <div className='activityTable'>
            <NavBarMenu />
            <div className='dateWrapper'>
              <h1>Vikuáætlunin mín</h1>
              <label>
                Dagsetning:
                <input type='date'
                       title="Dagsetning"
                       onChange={this.updateActivityTable.bind(this)}
                       ref='pickedDate'/>
              </label>
            </div>
            <div className='tableWrapper'>
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th> Tími </th>
                    <th> Lýsing </th>
                    <th> Vista/Breyta </th>
                  </tr>
                </thead>
                <tbody>
                  {activityItems}
                </tbody>
              </Table>
            </div>
          </div>
        );
    } else {
      return (
          <div className='activityTable'>
            <NavBarMenu />
            <div className='dateWrapper'>
              <h1>Virknitaflan mín</h1>
              <label>
                Dagsetning:
                <input type='date'
                       title="Dagsetning"
                       onChange={this.updateActivityTable.bind(this)}
                       ref='pickedDate' />
              </label>
            </div>
            <div className='tableWrapper'>
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th> Tími </th>
                    <th> Lýsing </th>
                    <th> Virkni </th>
                    <th> Ánægja </th>
                    <th> Vista/Breyta </th>
                  </tr>
                </thead>
                <tbody>
                  {activityItems}
                </tbody>
              </Table>
            </div>
          </div>
        );
    }

    }
}

export default ActivityTable;
