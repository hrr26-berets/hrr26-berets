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

  searchProducts(e) {
    e.preventDefault();
    var handleSearch = this.props.handleSearch
    var query = this.state.query
    axios.get('http://localhost:3000/search', {
      params: {
        query: query
      }
    })
    .then((res) => {
    handleSearch(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  onClick() {
    console.log(this.state.query)
  }

  render() {
    return (
      <form onSubmit={this.searchProducts.bind(this)} className="search">
        <div className="input-group">
          <input id={this.state.query} className="form-control" onChange={this.onSearch.bind(this)} type="text"/>
          <span className="input-group-btn">
            <button type="submit" id={this.state.query} onClick={this.searchProducts.bind(this)} className="searchBtn btn btn-primary">
              Search
            </button>
          </span>
        </div>
      </form>
    );
  }
}

export default SearchBar;
