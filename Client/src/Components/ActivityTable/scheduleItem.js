import React, { Component } from 'react';
import CommonSelect from './commonSelect';

class ScheduleItem extends Component {
  constructor(props){
    super(props);
    let editing = true;
    if(this.props.data.content) editing = false;
    this.state = {
      isEditing: editing
    }
  }

  componentWillReceiveProps( newProps ) {
    const nextData = newProps.data;
    if(!nextData.content) {
      this.setState({isEditing: true });
    } else {
      this.setState( {isEditing: false });
    }
  }

  startEditing(){
      this.setState( { isEditing: true })
  }

  saveEdit(  ) {
    const newContent = (this.refs.newContent.value)
                       ? this.refs.newContent.value : this.props.data.content;


    if(newContent) {
      const newScheduleItem = {time: this.props.data.time, content: newContent};
      this.props.updateScheduleItem( newScheduleItem );
    }
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
          <td><CommonSelect words={this.props.commonWords} ref="selector" fillInputBox={this.fillInputBox.bind(this)}/></td>
          <td><button onClick={this.saveEdit.bind(this)}>Vista</button></td>
        </tr>
      )
    } else {
      return (
        <tr key={this.props.data.time}>
          <td>{this.props.data.time}</td>
          <td>{this.props.data.content}</td>
          <td><button onClick={this.startEditing.bind(this)}>Breyta</button></td>
        </tr>
      )
    }
  }
}

export default ScheduleItem;
