import React, { Component } from 'react';
import ListItem from './ListItem.jsx';

class SearchResults extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Search Results</h3>
        {
          this.props.results.map(result => {
            let isInList = !!this.props.currentList.find(itm => itm.itemId === result.itemId);
            return (
              <ListItem
                item={result}
                key={result.itemId}
                addToList={this.props.addToList}
                removeItem={this.props.removeItem}
                isInList={isInList}
              />
            );
          })
        }
      </div>
    );
  }
}

export default SearchResults;
