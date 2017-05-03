import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import axios from 'axios';

class ThoughtListItem extends Component {

  constructor( props ) {
    super(props);
    this.state = {
      isEditing: false
    }

  }

  render() {
      return (
        <div className='thoughtListItem'>
          <p>Dagsetning færslu: {this.props.data.date.substring(0,10)}</p>
          <h2> Það sem þú þarft eða langar til að gera en gerir ekki: </h2>
          <p> {this.props.data.action} </p>
          <h2> Hvað fer í gegnum huga þinn um leið og þú frestar verkinu eða kemur þér hjá því?</h2>
          <p> {this.props.data.thought} </p>
          <h2> Skynsamlegt svar við hugsuninni: </h2>
          <p> {this.props.data.solution} </p>
        </div>
      );
  }
}

export default ThoughtListItem;
