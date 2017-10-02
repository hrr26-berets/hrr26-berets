import React, { Component } from 'react';

class SearchResultsEntry extends Component {
  constructor(props) {
    super(props);
    this.item = this.props.item;
  }

  handleAddItem(e) {
    e.preventDefault();
    // TODO: add item to current list in memory
  }

  handleBuyItem(e) {
    e.preventDefault();
    // TODO: redirect to item on merchant website
  }

  render() {
    return(
      <div className="list row col-md-9">
        <div className="col-md-3">
          <strong>{this.item.name.substring(0, 45)}</strong>
        </div>
        <div className="col-md-2">
          ${this.item.price}
        </div>
        <div className="col-md-2">
          <a href="#" onClick={this.handleAddItem.bind(this)}>Add to List</a>&nbsp;&nbsp;
        </div>
        <div className="col-md-2">
          <a href="#" onClick={this.handleBuyItem.bind(this)}>Buy it Now!</a>&nbsp;&nbsp;
        </div>
      </div>
    )
  }
}

export default SearchResultsEntry;
