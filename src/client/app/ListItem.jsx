import React, { Component } from 'react';
import { Modal, ModalBody } from 'react-modal-bootstrap';
import ProductDetails from './ProductDetails.jsx';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }


  handleRemove() {
    let itemId = this.props.item.itemId;
    this.props.removeItem(itemId);
  }

  handleItemClick() {
    this.setState({
      showDetails: !this.state.showDetails
    });
  }

  handleAdd() {
    this.props.addToList(this.props.item);
  }

  render() {
    const { item, vertical } = this.props;
    return (
      <div className={vertical ? 'col-sm-2' : 'row'}>
        <Modal
          isOpen={this.state.showDetails}
          onRequestHide={this.handleItemClick}
        >
          <ModalBody>
            <ProductDetails itemId={item.itemId} itemUrl={item.url} addToList={this.props.addToList} removeItem={this.props.removeItem} isInList={this.props.isInList} />
          </ModalBody>
        </Modal>
        <div className={vertical ? '' : 'col-sm-3'}>
          <a className="text-link" onClick={this.handleItemClick}><strong>{item.name.substring(0, 30)}</strong></a>
        </div><br />
        <div className={vertical ? '' : 'col-sm-3'}>
          <img src={item.image} alt=""/>
        </div>
        <div className={vertical ? '' : 'col-sm-2'}>
          <b> ${item.price} </b>
        </div><br />
        <div className={vertical ? '' : 'col-sm-2'}>
          {
            (this.props.isInList)
              ? <a className="btn btn-default btn-block" onClick={this.handleRemove}>Remove From List</a>
              : <a className="btn btn-default btn-block" onClick={this.handleAdd}>Add to List</a>
          }
        </div>
        <div className={vertical ? '' : 'col-sm-2'}>
          <a href={item.url} target="_blank" className="btn btn-primary btn-block">Buy it Now!</a><br /><br /><p/>
        </div>
      </div>
    );


  }
}

export default ListItem;
