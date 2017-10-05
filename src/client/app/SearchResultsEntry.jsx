import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import ProductDetails from './ProductDetails.jsx';

class SearchResultsEntry extends Component {
  constructor(props) {
    super(props);
    this.handleAddItem = this.handleAddItem.bind(this)
    this.state = {
      showDetails: false,
      details: {}
    };
  }

  handleAddItem(e) {
    //e.preventDefault();
    var item = this.props.item
    this.props.addToList(item)
    // TODO: add item to current list in memory
  }

  handleItemClick(e) {
    e.preventDefault();
    this.setState({
      showDetails: !this.state.showDetails
    });
  }

  render() {
    const { item } = this.props;

    return(
      <div className="list row">
        <Modal
          isOpen={this.state.showDetails}
          onRequestClose={this.handleItemClick.bind(this)}
          contentLabel="ItemDetails"
          style={{
            content: {
              position: 'absolute',
              height: '720px',
              width: '940px',
              left: '15%',
              right: '15%'
            }
          }}
        >
          <ProductDetails itemId={item.itemId} itemUrl={item.url} addToList={this.props.addToList}/>
        </Modal>
        <div className="col-sm-3">
          <a className="btn btn-link" onClick={this.handleItemClick.bind(this)}><strong>{item.name.substring(0, 40)}</strong></a>
        </div>
        <div className="col-sm-3">
          <img src={item.image} alt=""/>
        </div>
        <div className="col-sm-2">
          ${item.price}
        </div>
        <div className="col-sm-2">
          <a className="btn btn-default" onClick={this.handleAddItem}>Add to List</a>
        </div>
        <div className="col-sm-2">
          <a href={item.url} target="_blank" className="btn btn-primary" /*onClick={this.handleBuyItem.bind(this)}*/>Buy it Now!</a>
        </div>
      </div>
    );
  }
}

export default SearchResultsEntry;
