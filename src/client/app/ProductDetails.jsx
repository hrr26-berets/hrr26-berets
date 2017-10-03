import React, { Component } from 'react';
import Parser from 'html-react-parser';

class ProductDetails extends Component {
  constructor(props) {
    super(props);

  }

  handleAddToList() {
    // TODO: add this item to the current wishlist
  }

  handleBuyNow() {
    // TODO: redirect to merchant website
  }

  render() {
    const { details } = this.props;
    return (
      <div>
        <h3 className="product-name">{details.name}</h3>
        <img src={details.imageUrl} />
        <h4 className="sale-price">${details.price}</h4>
        {Parser(details.desc)}
        <div>
          <button className="btn btn-default" onClick={this.handleAddToList.bind(this)}>Add to wishList</button>
          <button className="btn btn-primary" onClick={this.handleBuyNow.bind(this)}>Buy it Now</button>
        </div>
      </div>
    )
  }
}

export default ProductDetails;
