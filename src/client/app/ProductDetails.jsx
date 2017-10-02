import React, { Component } from 'react';

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: {}
    }

    this.props.itemId = this.itemId;

  }

  getItemDetails() {
    axios.get('/lookupItem', {
      params: {
        itemId: this.itemId
      }
    })
      .then((res) => {
        this.setState({
          details: res.data,
        })
      })
      .catch((err) => {
        console.log(err);
      });
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
        <h3 className="product-name">{this.state.details.name}</h3>
        <img src={this.state.details.imageEntities[0].largeImage} />
        <div className="sale-price">{this.state.details.salePrice}</div>
        <div>Price history can go here</div>
        <div>{this.state.details.longDescription}</div>
        <div>
          <button className="add-to-list" onClick={this.handleAddToList.bind(this)}>Add to wishList</button>
          <button className="buy-now" onClick={this.handleBuyNow.bind(this)}>Buy it Now</button>
        </div>
      </div>
    )
  }
}

export default ProductDetails;
