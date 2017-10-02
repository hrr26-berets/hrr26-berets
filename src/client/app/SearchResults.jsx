import React, { Component } from 'react';
import SearchResultsEntry from './SearchResultsEntry.jsx';

class SearchResults extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="container">
        <h3>Search Results</h3>
        {
          this.props.results.map(result =>
            <SearchResultsEntry item={result} key={result.itemId}/>
            )
        }
      </div>
    )
  }
}

export default SearchResults;
