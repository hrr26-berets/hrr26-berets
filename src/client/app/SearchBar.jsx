import React, { Component } from 'react';

class SearchBar extends Component{
  constructor(props) {
    super(props);
    this.state = {
      'query': undefined
    }
  }

  onSearch(e) {
    console.log(this.state)
    this.setState({
      'query': e.target.value
    })
    console.log(this.state)

    //this.props.productSearch(e)
    //function passed from parent component that grabs search text to make api calls
    //change this.state on text input change
    //set search button id to this.state.query
    //in productSearch, the search button is e.target
    //and e.target.value is the value of the search button id
  }
  render() {
    return (
      <span className="search">
        <input id={this.state.query} type="text"/>
        <button id={this.state.query} onClick={this.props.productSearch} className="searchBtn">
          Search
        </button>
      </span>
    );
  }
}

export default SearchBar;
