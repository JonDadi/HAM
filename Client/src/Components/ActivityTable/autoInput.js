import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';


// Code from
// https://github.com/moroshko/react-autosuggest#installation

let commonWords = [];

const getSuggestion = value => {
  const inputLength = value.length;
  const inputValue = value.toLowerCase();
  console.log("LENGD"+commonWords[0].content);
  return inputLength === 0 ? [] : commonWords.filter( item =>
    item.content.toLowerCase().slice(0, inputLength) === inputValue
  );
}
const getSuggestionValue = suggestion => suggestion.content;

const renderSuggestion = suggestion => (
    <span>
      {suggestion.content}
    </span>
)

class autoInput extends Component {
  constructor(props){
    super(props);
    commonWords = this.props.commonWords;
    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = ( event, {newValue}) => {
    this.setState({
      value: newValue
    });
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestion(value)
    });
  };


  render() {
    const {value, suggestions } = this.state;

    const inputProps = {
      placeholder: this.props.placeholder,
      value,
      onChange: this.onChange
    };
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default autoInput;
