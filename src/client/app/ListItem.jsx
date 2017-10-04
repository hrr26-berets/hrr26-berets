import React, { Component } from 'react';

class ListItem extends Component {
  constructor(props){
    super(props);
    this.handleRemove = this.handleRemove.bind(this)
  }


  handleRemove() {
    var product = this.props.product
    this.props.removeItem(product)
  }

  render() {
    const { item } = this.props
    console.log(this.props)
  return (
  <div className="row">
          <div className="col-sm-3">
          <a className="btn btn-link" /*onClick={this.handleItemClick.bind(this)}*/><strong>{this.props.product.name.substring(0, 40)}</strong></a>
        </div>
        <div className="col-sm-3">
          <img src={this.props.product.image} alt=""/>
        </div>
        <div className="col-sm-2">
          ${this.props.product.price}
        </div>
        <div className="col-sm-2">
          <a className="btn btn-default" onClick={this.handleRemove}>Remove From List</a>
        </div>
        <div className="col-sm-2">
          <a href={this.props.product.url} target="_blank" className="btn btn-primary">Buy it Now!</a>
        </div>
 </div>
   )


  }
}

export default ListItem;