import React, { Component } from 'react';

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
    return (
      <div>
        <h3 className="product-name">{this.props.product.name}</h3>
        <img src={this.props.product.imageEntities[0].largeImage} />
        <div className="sale-price">{this.props.product.salePrice}</div>
        <div>Price history can go here</div>
        <div>{this.props.product.longDescription}</div>
        <div>
          <button className="add-to-list" onClick={this.handleAddToList.bind(this)}>Add to wishList</button>
          <button className="buy-now" onClick={this.handleBuyNow.bind(this)}>Buy it Now</button>
        </div>
      </div>
    )
  }
}

export default ProductDetails;
