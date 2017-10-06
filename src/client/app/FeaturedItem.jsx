import React, {Component} from 'react';
import ProductDetails from './ProductDetails.jsx';
import { Modal, ModalBody } from 'react-modal-bootstrap';



class FeaturedItem extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showDetails:false
      };
      this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick() {
      this.setState({
        showDetails: !this.state.showDetails
    });
  }

  render() {
    const { item } = this.props;
    return (
      <div>
        <Modal
          isOpen={this.state.showDetails}
          onRequestHide={this.handleItemClick}
        >
          <ModalBody>
            <ProductDetails itemId={item.itemId} itemUrl={item.productUrl} addToList={this.props.addToList}/>
          </ModalBody>
        </Modal>
        <div className="item-title">
          <a className="btn-link btn-block text-link" onClick={this.handleItemClick}><strong>{item.name.split(' ').slice(0,3).join(' ')}</strong></a>
        </div>
      </div>
    );
  }

}

export default FeaturedItem;
