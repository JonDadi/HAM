import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import NavBarMenu from '../Navbar/navBarMenu';
import axios from 'axios';
import moment from 'moment';
import ThoughtList from './thoughtList';

class ThoughtsTemplate extends Component {


  componentDidMount() {


  }

  showThoughtList( ) {
    this.refs.thoughtList.fetchThoughtList();
  }

  saveThoughtsTemplate (  ) {
    const action = this.refs.actionText.value;
    const thoughts = this.refs.thoughtsText.value;
    const solution = this.refs.solutionText.value;
    const date = moment().format().substring(0,10);
    if(action && thoughts && solution) {
      const thoughtTemplate = {'thought': thoughts,
                                'action': action,
                                'solution': solution,
                                'time': date}
      axios.post('/saveThoughtTemplate', {
        thoughtTemplate: thoughtTemplate,
      })
      .then( res => {
      });

      this.refs.actionText.value = "";
      this.refs.thoughtsText.value = "";
      this.refs.solutionText.value = "";

    }
  }


  render() {
    return (
      <div className='thoughtsTemplate'>
        <NavBarMenu />
        <div className="thoughtsInputWrapper">
          <label>
            Það sem þú þarft eða langar til að gera en gerir ekki:
            <input type="text" ref="actionText" />
          </label>
          <label>
            Hvað fer í gegnum huga þinn um leið og þú frestar verkinu eða kemur þér hjá því?
            <textarea rows="4" ref="thoughtsText"/>
          </label>
          <label>
            Veldu eina af þessum hugsunum og reyndu að smíða skynsamlegt svar við henni:
            <textarea rows="4" type="text" ref="solutionText"/>
          </label>
          <Button bsStyle="primary" title="Vista" onClick={this.saveThoughtsTemplate.bind(this)}>Vista færslu</Button>
          <Button bsStyle="primary" title="Eldri færslur" onClick={this.showThoughtList.bind(this)}>Birta eldri færslur</Button>
          <ThoughtList ref="thoughtList"/>
        </div>

      </div>
    );
  }
}

export default ThoughtsTemplate;
