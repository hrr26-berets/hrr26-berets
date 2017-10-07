import React from 'react';
import Item from './Item.jsx';

const PopularItems = (props) => {
  if (props.products) {
    return (
      <div className="popular-items is-table-row">
        {props.products.map(item =>
          <Item
            addToList={props.addToList}
            currentList={props.currentList}
            item={item}
            removeItem={props.removeItem}
            key={item.itemId}/>
        )}
      </div>);
  }
  return (
    <div className="popular-items">
        No products here!
    </div>
  );
};

export default PopularItems;
