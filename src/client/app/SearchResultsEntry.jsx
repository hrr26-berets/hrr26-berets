import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import ProductDetails from './ProductDetails.jsx';

class SearchResultsEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      details: {}
    }
    this.item = this.props.item;
  }

  componentDidMount() {
    this.getItemDetails();
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

  getItemDetails() {
    axios.get('/lookupItem', {
      params: {
        query: this.item.itemId
      }
    })
      .then((res) => {
        this.setState({
          details: res.data
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return(
      <div className="list row col-md-9">
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
          <ProductDetails details={this.state.details}/>
        </Modal>
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
