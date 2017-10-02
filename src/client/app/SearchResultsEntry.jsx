import React, { Component } from 'react';
import ProductDetails from './ProductDetails.jsx';
import Modal from 'react-modal';

class SearchResultsEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false
    }
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

  handleItemClick() {
    this.setState({
      showDetails: !this.state.showDetails
    })
  }

  render() {
    return(
      <div className="list row col-md-9">
        {/* <Modal
          isOpen={this.state.showDetails}
          onRequestClose={this.handleItemClick.bind(this)}
          contentLabel="ItemDetails"
          style={{
            content: {
          position: 'absolute',
          height: '720',
          width: '940',
          left: '15%',
          right: '15%'
            }
          }}
        > */}
        {
          (this.state.showDetails)
            ? <ProductDetails itemId={this.item.itemId}/>
            : null
              }

              {/* </Modal> */}
        <div className="col-md-3">
          <a href="#" onClick={this.handleItemClick.bind(this)}><strong>{this.item.name.substring(0, 40)}</strong></a>
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
