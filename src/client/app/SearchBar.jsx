import React, { Component } from 'react';
import axios from 'axios';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'query': undefined
    };
    this.onSearch = this.onSearch.bind(this);
    this.searchProducts = this.searchProducts.bind(this);
  }

  onSearch(e) {
    this.setState({
      'query': e.target.value
    });
  }

  searchProducts(e) {
    var handleSearch = this.props.handleSearch;
    var query = this.state.query;
    axios.get('/search', {
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
    e.preventDefault();
  }

  onClick() {
    console.log(this.state.query);
  }

  render() {
    return (
      <form onSubmit={this.searchProducts} className="search">
        <div className="input-group">
          <input id={this.state.query} className="form-control" onChange={this.onSearch} type="text"/>
          <span className="input-group-btn">
            <button type="submit" id={this.state.query} onClick={this.searchProducts} className="searchBtn btn btn-primary">
              Search
            </button>
          </span>
        </div>
      </form>
    );
  }
}

export default SearchBar;
