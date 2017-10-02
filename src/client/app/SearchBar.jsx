import React, { Component } from 'react';
import axios from 'axios';

class SearchBar extends Component{
  constructor(props) {
    super(props);
    this.state = {
      'query': undefined
    }
  }

  onSearch(e) {
    this.setState({
      'query': e.target.value
    })
  }

  searchProducts() {
    var handleSearch = this.props.handleSearch
    var query = this.state.query
    axios.get('http://localhost:3000/search', {
      params: {
        query: query
      }
    })
    .then(function(response) {
    handleSearch(response.data);
    })
    .catch(function(error) {
      console.log(error)
    })
  }

  onClick() {
    console.log(this.state.query)
  }

  render() {
    return (
      <span className="search">
        <input id={this.state.query} onChange={this.onSearch.bind(this)} type="text"/>
        <button id={this.state.query} onClick={this.searchProducts.bind(this)} className="searchBtn">
          Search
        </button>
      </span>
    );
  }
}

export default SearchBar;
