import React, { Component } from 'react';
import SearchResultsEntry from './SearchResultsEntry.jsx';

class SearchResults extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <h3>Search Results</h3>
        {
          this.props.results.map(result =>
            <SearchResultsEntry item={result} key={result.itemId} addToList={this.props.addToList}/>
            )
        }
      </div>
    )
  }
}

export default SearchResults;
