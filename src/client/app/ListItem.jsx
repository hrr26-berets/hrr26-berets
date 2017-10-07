import React, { Component } from 'react';
import { Modal, ModalBody } from 'react-modal-bootstrap';
import ProductDetails from './ProductDetails.jsx';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }


  handleRemove() {
    let itemId = this.props.product.itemId;
    this.props.removeItem(itemId);
  }

  handleItemClick() {
    this.setState({
      showDetails: !this.state.showDetails
    });
  }

  render() {
    const { item } = this.props;
    console.log(this.props);
    return (
      <div className="row">
        <Modal
          isOpen={this.state.showDetails}
          onRequestHide={this.handleItemClick}
        >
          <ModalBody>
            <ProductDetails itemId={this.props.product.itemId} itemUrl={this.props.product.url} removeItem={this.props.removeItem} isInList={true} currentList={this.props.currentList}/>
          </ModalBody>
        </Modal>
        <div className="col-sm-3">
          <a className="btn btn-link" onClick={this.handleItemClick}><strong>{this.props.product.name.substring(0, 30)}</strong></a>
        </div>
        <div className="col-sm-3">
          <img src={this.props.product.image} alt=""/>
        </div>
        <div className="col-sm-2">
          <b> ${this.props.product.price} </b>
        </div>
        <div className="col-sm-2">
          <a className="btn btn-default" onClick={this.handleRemove}>Remove From List</a>
        </div>
        <div className="col-sm-2">
          <a href={this.props.product.url} target="_blank" className="btn btn-primary">Buy it Now!</a>
        </div>
      </div>
    );


  }
}

export default ListItem;
