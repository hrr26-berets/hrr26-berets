import React from 'react';
import Item from './Item.jsx';

var PopularItems = (props) => {
  if (props.products) {
    return (
      <div className="popular-items">
        {props.products.map(product =>
          <Item onClick={props.onClick} product={product} key={product.itemId}/>
        )}
      </div>)
  }
    return (
      <div classname="popular-items">
        No products here!
      </div>
      )
}


//render one box for each item
//we want three now but could handle more or less
//onClick passed from parent component allows user to follow url link to walmart product page
//When styling make sure products are arranged horizontally.


export default PopularItems;
