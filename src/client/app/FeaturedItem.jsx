import React, {Component} from 'react';
import ProductDetails from './ProductDetails.jsx';
import Modal from 'react-modal';



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
          <ProductDetails itemId={item.itemId} itemUrl={item.productUrl} addToList={this.props.addToList}/>
        </Modal>
        <div className="item-title">
          <a className="btn-link btn-block text-link" onClick={this.handleItemClick}><strong>{item.name.split(' ').slice(0,3).join(' ')}</strong></a>
        </div>
      </div>
    );
  }

}

export default FeaturedItem;
