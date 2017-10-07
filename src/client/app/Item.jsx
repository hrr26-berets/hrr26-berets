import React, { Component } from 'react';
import { Modal, ModalBody } from 'react-modal-bootstrap';
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
    let item = {};
    item.name = this.props.item.name;
    item.image = this.props.item.thumbnailImage;
    item.itemId = this.props.item.itemId;
    item.url = this.props.item.productUrl;
    item.price = this.props.item.salePrice;

    this.props.addToList(item);
  }

  handleItemClick() {
    this.setState({
      showDetails: !this.state.showDetails
    });
  }

  render() {
    const { item } = this.props;

    return (
      <div className="popular-item col-xs-2">
        <Modal
          isOpen={this.state.showDetails}
          onRequestHide={this.handleItemClick}
        >
          <ModalBody>
            <ProductDetails itemId={item.itemId} itemUrl={item.productUrl} addToList={this.props.addToList} removeItem={this.props.removeItem} currentList={this.props.currentList}/>
          </ModalBody>
        </Modal>
        <div className="item-title"><br/>
          <a className="btn-link btn-block text-link" onClick={this.handleItemClick}><strong>{item.name.substring(0, 30)}</strong></a>
        </div>
        <div className="item-image"><br/>
          <img src={item.thumbnailImage} onClick={this.handleItemClick}/>
        </div>
        <div className="item-price"><p/>
          <b>${item.salePrice}</b>
        </div> <br />
        <div>
          <a className="btn btn-default btn-block" onClick={this.handleAddItem}>Add to List</a>
          <a href={item.productUrl} target="_blank" className="btn btn-primary btn-block">Buy it Now!</a>
        </div>
      </div>
    );
  }
}


export default Item;
