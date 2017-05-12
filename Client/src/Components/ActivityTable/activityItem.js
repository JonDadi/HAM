import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';
import AutoInput from './autoInput';


class ActivityItem extends Component {
  constructor(props){
    super(props);
    let editing;
    if(this.props.data.content) {
      editing = false;
    } else {
      editing = true;
    }

    this.state = {
      isEditing: editing,
      badInput: false
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({badInput: false});
    const nextData = newProps.data;
    const currData = this.props.data;
    if(this.props.isInFuture){
      if(!nextData.content) {
        this.setState({ isEditing: true });
      } else {
        this.setState( {isEditing: false });
      }
    } else {
      if(!nextData.content || !nextData.skill || !nextData.pleasure) {
        this.setState({ isEditing: true });
      } else {
        this.setState( {isEditing: false });
      }
    }
  }

  startEditing(){
      this.setState({badInput: false});
      this.setState( { isEditing: true });
  }

  saveEdit(  ) {
    let newContent = this.props.data.content;
    if(this.refs.newContent.state.value){
      newContent = this.refs.newContent.state.value;
    }
    if(!this.props.isInFuture) {
      let newSkill = this.props.data.skill;
      let newPleasure = this.props.data.pleasure;
      if(this.refs.pleasure.value){
        newPleasure = this.refs.pleasure.value;
      }
      if(this.refs.skill.value){
        newSkill = this.refs.skill.value;
      }
      if( !newContent || !newSkill || !newPleasure
          || newSkill > 10 || newSkill < 0 || newPleasure > 10
          || newPleasure < 0) {
        // User has not filled out all the inputs or inputs are invalid
        this.setState({badInput: true});
      } else {
        const newActivityItem = {time: this.props.data.time,
                                 content: newContent,
                                 skill: newSkill,
                                 pleasure: newPleasure,};
        this.props.updateActivityItem( newActivityItem );
        this.setState({isEditing: false});

      }
    } else {
      // Item is in the future,  so no skill or pleasure
      if( !newContent) {
        // User has not filled out all the inputs or inputs are invalid
        this.setState({badInput: true});
      } else {
        const newActivityItem = {time: this.props.data.time,
                                 content: newContent,
                                 skill: 0,
                                 pleasure: 0};
        this.props.updateActivityItem( newActivityItem );
        this.setState({isEditing: false});
      }
    }


  }
  fillInputBox( newValue ) {
    this.refs.newContent.value = newValue;
  }

// <td><input type="text" title="Lýsing" placeholder={this.props.data.content} ref="newContent" /></td>
  render() {
    if(this.state.isEditing){
        if(this.state.badInput){
          // Bad input
          if(this.props.isInFuture ) {
            return (
              <tr key={this.props.data.time} className='badInput'>
                <td>{this.props.data.time}</td>
                <td><AutoInput placeholder={this.props.data.content} commonWords={this.props.commonWords} ref="newContent"/></td>
                <td><Button bsStyle="primary" title="Vista" onClick={this.saveEdit.bind(this)}><Glyphicon glyph="glyphicon glyphicon-floppy-disk"></Glyphicon></Button></td>
              </tr>
            )
          } else {
            return (
              <tr key={this.props.data.time} className='badInput'>
                <td>{this.props.data.time}</td>
                <td><AutoInput placeholder = {this.props.data.content} commonWords={this.props.commonWords} ref="newContent"/></td>
                <td><input type="number" min="1" max="10" title="Virkni" placeholder={this.props.data.pleasure} ref="pleasure" /></td>
                <td><input type="number" min="1" max="10" title="Ánægja" placeholder={this.props.data.skill} ref="skill" /></td>
                <td><Button bsStyle="primary" title="Vista" onClick={this.saveEdit.bind(this)}><Glyphicon glyph="glyphicon glyphicon-floppy-disk"></Glyphicon></Button></td>
              </tr>
            )
          }
        } else {
          // Correct input
          if(this.props.isInFuture){
            return (
              <tr key={this.props.data.time} className='editing'>
                <td>{this.props.data.time}</td>
                <td><AutoInput placeholder={this.props.data.content} commonWords={this.props.commonWords} ref="newContent"/></td>
                <td><Button bsStyle="primary" title="Vista" onClick={this.saveEdit.bind(this)}><Glyphicon glyph="glyphicon glyphicon-floppy-disk"></Glyphicon></Button></td>
              </tr>
            )
          } else {
            return (
              <tr key={this.props.data.time} className='editing'>
                <td>{this.props.data.time}</td>
                <td><AutoInput placeholder = {this.props.data.content} commonWords = {this.props.commonWords} ref="newContent"/></td>
                <td><input type="number" min="1" max="10" title="Virkni" placeholder={this.props.data.pleasure} ref="pleasure" /></td>
                <td><input type="number" min="1" max="10" title="Ánægja" placeholder={this.props.data.skill} ref="skill" /></td>
                <td><Button bsStyle="primary" title="Vista" onClick={this.saveEdit.bind(this)}><Glyphicon glyph="glyphicon glyphicon-floppy-disk"></Glyphicon></Button></td>
              </tr>
            )
          }

        }

    } else {
      if(this.props.isInFuture) {
        return (
          <tr key={this.props.data.time} className='saved'>
            <td>{this.props.data.time}</td>
            <td>{this.props.data.content}</td>
            <td><Button bsStyle="primary" title="Breyta" onClick={this.startEditing.bind(this)}><Glyphicon glyph="glyphicon glyphicon-pencil"></Glyphicon></Button></td>
          </tr>
        )
      } else {
        return (
          <tr key={this.props.data.time} className='saved'>
            <td>{this.props.data.time}</td>
            <td>{this.props.data.content}</td>
            <td>{this.props.data.pleasure}</td>
            <td>{this.props.data.skill}</td>
            <td><Button bsStyle="primary" title="Breyta" onClick={this.startEditing.bind(this)}><Glyphicon glyph="glyphicon glyphicon-pencil"></Glyphicon></Button></td>
          </tr>
        )
      }
    }
  }
}

export default ActivityItem;
