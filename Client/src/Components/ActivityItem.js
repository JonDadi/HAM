import React, { Component } from 'react';
import './App.css';
import CommonSelect from './commonSelect';

class ActivityItem extends Component {
  constructor(props){
    super(props);
    let editing = true;
    if(this.props.data.content) editing = false;
    this.state = {
      isEditing: editing
    }
  }

  startEditing(){
      this.setState( { isEditing: true })
  }

  saveEdit(  ) {
    let newContent = this.props.data.content;
    let newSkill = this.props.data.skill;
    let newPleasure = this.props.data.pleasure;
    if(this.refs.pleasure.value){
      newPleasure = this.refs.pleasure.value;
    }
    if(this.refs.skill.value){
      newSkill = this.refs.skill.value;
    }
    if(this.refs.newContent.value){
      newContent = this.refs.newContent.value;
    }

    const newActivityItem = {time: this.props.data.time,
                             content: newContent,
                             skill: newSkill,
                             pleasure: newPleasure,};
    this.props.updateActivityItem( newActivityItem );
    this.setState({isEditing: false});

  }
  fillInputBox( newValue ) {
    this.refs.newContent.value = newValue;
  }


  render() {
    if(this.state.isEditing){
      return (
        <tr key={this.props.data.time}>
          <td>{this.props.data.time}</td>
          <td><input type="text" placeholder={this.props.data.content} ref="newContent" /></td>
          <td><input type="number" min="1" max="10" placeholder={this.props.data.pleasure} ref="pleasure" /></td>
          <td><input type="number" min="1" max="10" placeholder={this.props.data.skill} ref="skill" /></td>
          <td><CommonSelect words={this.props.commonWords} ref="selector" fillInputBox={this.fillInputBox.bind(this)}/></td>
          <td><button onClick={this.saveEdit.bind(this)}>Vista</button></td>
        </tr>
      )
    } else {
      return (
        <tr key={this.props.data.time}>
          <td>{this.props.data.time}</td>
          <td>{this.props.data.content}</td>
          <td>{this.props.data.pleasure}</td>
          <td>{this.props.data.skill}</td>
          <td><button onClick={this.startEditing.bind(this)}>Breyta</button></td>
        </tr>
      )
    }
  }
}

export default ActivityItem;
