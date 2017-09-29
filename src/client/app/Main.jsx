import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import PopularItems from './PopularItems.jsx';
import SearchBar from './SearchBar.jsx'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popular: [
      {_id: 1, name: 'pizza', salePrice: 3.99},
      {_id: 2, name: 'pizza', salePrice: 3.99},
      {_id: 3, name: 'pizza', salePrice: 3.99},
      {_id: 4, name: 'pizza', salePrice: 3.99}
      ]
    };
  }

  render() {
    return (
      <div>
        <h1>wishList</h1>
        <div><SearchBar /></div>
        <PopularItems products={this.state.popular}/>
      </div>
      )
  }
}

export default Main;
