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
    };
  }

  componentDidMount() {
    this.getItemDetails();
  }

  handleAddItem(e) {
    e.preventDefault();
    // TODO: add item to current list in memory
  }

  // handleBuyItem(e) {
  //   e.preventDefault();
  //   // TODO: redirect to item on merchant website
  // }

  handleItemClick(e) {
    e.preventDefault();
    this.setState({
      showDetails: !this.state.showDetails
    });
  }

  getItemDetails() {
    axios.get('/lookupItem', {
      params: {
        query: this.props.item.itemId
      }
    })
      .then((res) => {
        this.setState({
          details: res.data
        });
      })
      .catch((err) => {
        console.log(err);
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
          <ProductDetails details={this.state.details}/>
        </Modal>
        <div className="col-sm-3">
          <a href="#" onClick={this.handleItemClick.bind(this)}><strong>{item.name.substring(0, 40)}</strong></a>
        </div>
        <div className="col-sm-3">
          <img src={item.image} alt=""/>
        </div>
        <div className="col-sm-2">
          ${item.price}
        </div>
        <div className="col-sm-2">
          <a href="#" className="btn btn-default" onClick={this.handleAddItem.bind(this)}>Add to List</a>
        </div>
        <div className="col-sm-2">
          <a href={item.url} target="_blank" className="btn btn-primary" /*onClick={this.handleBuyItem.bind(this)}*/>Buy it Now!</a>
        </div>
      </div>
    );
  }
}

export default SearchResultsEntry;
