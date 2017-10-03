import React, { Component } from 'react';

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.details = this.props.details;
  }

  handleAddToList() {
    // TODO: add this item to the current wishlist
  }

  handleBuyNow() {
    // TODO: redirect to merchant website
  }

  render() {
    return (
      <div>
        <h3 className="product-name">{this.details.name}</h3>
        <img src={this.details.images.largeImage} />
        <h4 className="sale-price">${this.details.price}</h4>
        <div>{unescape(this.details.description)}</div>
        <div>
          <button className="add-to-list" onClick={this.handleAddToList.bind(this)}>Add to wishList</button>
          <button className="buy-now" onClick={this.handleBuyNow.bind(this)}>Buy it Now</button>
        </div>
      </div>
    )
  }
}

export default ProductDetails;
