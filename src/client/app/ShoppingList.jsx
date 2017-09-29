import React, { Component } from 'react';
import Item from 'item.jsx';

class ShoppingList extends Component {
  constructor(props) {
    super(props);
  }
  //the app view will include a user's current list under 'items' in state
  //'items' starts out as an empty array/object
  //if a user changes to one of their old lists from the database we can setState ({'items': list from database}) and re-render this component

  //Item onClick should pop out product details

  //App view should include renderList function that toggles shopping list state
  //to conditionally render list

  //App view should include saveList function that saves the current 'items' list in app state to the database.


  render() {
    //<button className="exit" onClick={props.renderList}></button>
    //<button className="save" onClick={props.saveList}</button>
    <h1>{props.list.name}<h1/>
    {props.list.items.map(listItem =>
      <Item onClick={props.onClick} product={listItem}/>
      )}

  }
}