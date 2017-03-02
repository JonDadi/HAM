import React, { Component } from 'react';
import './App.css';


class commonSelect extends Component {

  handleChange(){
    this.props.fillInputBox(this.refs.selection.value);
  }

  render() {
    const selection = this.props.words.map( item => {
      return (
        <option value={item} key={item} >{item}</option>
      )
    });

    return (
      <select ref="selection" onChange={this.handleChange.bind(this)}> {selection} </select>
    )
  }
}

export default commonSelect;
