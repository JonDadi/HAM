import React, { Component } from 'react';


class ActivityTableInputs extends Component {


  handleCreate(event) {

    event.preventDefault();

    const timeVal = this.refs.timeInputStart.value+'-'+this.refs.timeInputEnd.value;
    const contentVal = this.refs.contentInput.value;
    const pleasureVal = this.refs.pleasureInput.value;
    const skillVal = this.refs.skillInput.value;

    const item = { time: timeVal,
                   content: contentVal,
                   skill: skillVal,
                   pleasure: pleasureVal}

    this.props.createActivityItem( item );

  }

  render() {
    return (
      <div className='activityTableInputs'>
        <form onSubmit={this.handleCreate.bind(this)}>
          <label>
            Tími:
            <input type='time' ref='timeInputStart'/>
            til
            <input type='time' ref='timeInputEnd'/>
          </label>
          <br />
          <label>
            Lýsing:
            <textarea ref='contentInput' />
          </label>
          <br />
          <label>
            Ánægja:
            <input type='number' min="1" max="10" ref='pleasureInput'/>
          </label>
          <label>
            Færni:
            <input type='number' min="1" max="10" ref='skillInput'/>
          </label>
          <br />
          <button> Vista færslu </button>
        </form>
      </div>
    );
  }
}

export default ActivityTableInputs;
