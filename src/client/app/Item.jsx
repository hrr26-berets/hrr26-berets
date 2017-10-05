import React, { Component } from 'react';
import Modal from 'react-modal';
import ProductDetails from './ProductDetails.jsx';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
    };
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleAddItem() {
    let item = this.props.item
    this.props.addToList(item);
  }

  handleItemClick() {
    this.setState({
      showDetails: !this.state.showDetails
    });
  }

  render() {
    const { item } = this.props;

    return(
      <div className="popular-item col-xs-2">
        <Modal
          isOpen={this.state.showDetails}
          onRequestClose={this.handleItemClick}
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
          <ProductDetails itemId={item.itemId} itemUrl={item.productUrl}/>
        </Modal>
        <div className="item-title">
          <a className="btn-link btn-block" onClick={this.handleItemClick}><strong>{item.name.substring(0, 40)}</strong></a>
        </div>
        <div className="item-image">
          <img src={item.thumbnailImage} onClick={this.handleItemClick}/>
        </div>
        <div className="item-price">
          ${item.salePrice}
        </div>
        <div>
          <a className="btn btn-default btn-block" onClick={this.handleAddItem}>Add to List</a>
          <a href={item.productUrl} target="_blank" className="btn btn-primary btn-block">Buy it Now!</a>
        </div>
      </div>
    )
  }
}


export default Item;
