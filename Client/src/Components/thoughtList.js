import React, { Component } from 'react';
import './App.css';
import {Button} from 'react-bootstrap';
import NavBarMenu from './navBarMenu';
import axios from 'axios';
import ThoughtListItem from './thoughtListItem';

const items = [];

class ThoughtList extends Component {

  constructor( props ) {
    super(props);
    this.state = {
      items
    }

  }

  fetchThoughtList() {
    console.log("wasup");
    axios.get( '/fetchThoughtTemplates')
    .then( res => {
      this.setState({items: res.data.reverse()});
      console.log("data"+res.data);
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
