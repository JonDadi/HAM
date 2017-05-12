import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import ThoughtListItem from './thoughtListItem';
import { browserHistory } from 'react-router';

const items = [];

class ThoughtList extends Component {

  constructor( props ) {
    super(props);
    this.state = {
      items
    }

  }

  fetchThoughtList() {
    axios.get( '/fetchThoughtTemplates')
    .then( res => {
      this.setState({items: res.data.reverse()});
    });
  }

  render() {
        const thoughtItems = this.state.items.map( item => {
          return (
            <ThoughtListItem data={item} />
          );
        })

    return(
      <div className='thoughtItemsList'>
        {thoughtItems}
      </div>
    );
  }
}

export default ThoughtList;
