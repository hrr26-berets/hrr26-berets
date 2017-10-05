import React from 'react';
import axios from 'axios';
import FeaturedItem  from  './FeaturedItem.jsx';

var FeaturedLists = (props) => {
    return (
      <div id="FL-Container">
        <div className="FL-col1">
          <div className="aligning"> Electronics</div>
          {props.list[3944].map(item =><FeaturedItem item={item} addToList={props.addToList} key={item.itemId}/>) }
        </div>

        <div className="FL-col1">
          <div className="aligning"> Beauty</div>
          {props.list[1085666].map(item =><FeaturedItem item={item} addToList={props.addToList} key={item.itemId}/>) }
        </div>

        <div className="FL-col1">
          <div className="aligning"> Clothing</div>
          {props.list[5438].map(item =><FeaturedItem item={item} addToList={props.addToList} key={item.itemId}/>) }
        </div>

        <div className ="FL-col1">
          <div className="aligning"> Health </div>
          {props.list[976760].map(item =><FeaturedItem item={item} addToList={props.addToList} key={item.itemId}/>) }
     </div>
   </div>
  )

 }

export default FeaturedLists;
