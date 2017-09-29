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
      {_id: 1, name: 'pizza', salePrice: 3.99, thumbnailImage: 'https://i5.walmartimages.com/asr/2521fd6c-b947-4b2d-9a31-7887d1f1a0c0_1.659b2d798672c8f5e1338d929452b74e.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF'},
      {_id: 2, name: 'pizza', salePrice: 3.99, thumbnailImage: 'https://i5.walmartimages.com/asr/2521fd6c-b947-4b2d-9a31-7887d1f1a0c0_1.659b2d798672c8f5e1338d929452b74e.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF'},
      {_id: 3, name: 'pizza', salePrice: 3.99, thumbnailImage: 'https://i5.walmartimages.com/asr/2521fd6c-b947-4b2d-9a31-7887d1f1a0c0_1.659b2d798672c8f5e1338d929452b74e.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF'},
      {_id: 4, name: 'pizza', salePrice: 3.99, thumbnailImage: 'https://i5.walmartimages.com/asr/2521fd6c-b947-4b2d-9a31-7887d1f1a0c0_1.659b2d798672c8f5e1338d929452b74e.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF'}
      ]
    };
  }

  render() {
    return (
      <div className="container">
        <h1>wishList</h1>
        <div><SearchBar className="row"/></div>
        <PopularItems products={this.state.popular}/>
      </div>
      )
  }
}

export default Main;
