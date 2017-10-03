import React, { Component } from 'react';
import Parser from 'html-react-parser';
import axios from 'axios';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      doneLoading: false
    }

  }
  componentDidMount() {
    this.getItemDetails();
  }

  getItemDetails() {
    axios.get('/lookupItem', {
      params: {
        query: this.props.itemId
      }
    })
      .then((res) => {
        this.setState({
          details: res.data,
          doneLoading: true
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleAddToList() {
    // TODO: add this item to the current wishlist
  }

  render() {
    return (
        <div>
          {
            (this.state.doneLoading)
              ? <div>
                <h3 className="product-name">{this.state.details.name}</h3>
                <img src={this.state.details.imageUrl} />
                <h4 className="sale-price">${this.state.details.price}</h4>
                <div>
                  {Parser(''+this.state.details.desc)}
                </div>
                <div style={{ marginTop: '15px' }}>
                  <a className="btn btn-default" onClick={this.handleAddToList.bind(this)}>Add to wishList</a>
                  <a href={this.props.itemUrl} target="_blank" className="btn btn-primary">Buy it Now</a>
                </div>
              </div>
              : <div>Loading...</div>
          }
        </div>
    )
  }
}

export default ProductDetails;
