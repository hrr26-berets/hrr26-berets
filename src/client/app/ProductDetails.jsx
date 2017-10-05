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
    let item = {};
    item.name = this.state.details.name;
    item.image = this.state.details.thumbnailImage;
    item.itemId = this.props.itemId;
    item.url = this.props.itemUrl;
    item.price = this.state.details.price;

    this.props.addToList(item);
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
                  {Parser(Parser(''+this.state.details.desc))}
                </div>
                <div style={{ marginTop: '15px' }}>
                  <a className="btn btn-default" onClick={this.handleAddToList.bind(this)}>Add to List</a>
                  <a href={this.props.itemUrl} target="_blank" className="btn btn-primary">Buy it Now!</a>
                </div>
              </div>
              : <div>Loading...</div>
          }
        </div>
    )
  }
}

export default ProductDetails;
