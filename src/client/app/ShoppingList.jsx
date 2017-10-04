import React, { Component } from 'react';
import ListItem from './ListItem.jsx';

export default class ShoppingList extends Component {
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

  //When styling <Item/> component here, make sure items are vertically stacked.


  render() {
    const { props } = this.props
    if (this.props.list.length) {
    return(
      <div>
      <h1>{this.props.name}</h1>
      <div>
        {this.props.list.map(product =>
          <ListItem product={product} key={product.itemId} removeItem={this.props.removeItem}/>
          )}
      </div>
      </div>
    )
  }
  return (
    <div>There's nothing in your list yet!</div>
    )
  }
}

    //       <Item onClick={props.onClick} product={listItem} key={listItem.itemId}/>
    //     )}
    //   </div>)
    // return (
    //   //<button className="exit" onClick={props.renderList}></button>
    //   //<button className="save" onClick={props.saveList}</button>
    //   <h1>{props.name}<h1/>
    //   <button className="btn btn-primary">Save</button>
    //   <div>
    //   {props.list.map(listItem =>
    //     <Item product={listItem} />
    //     )}
    //   </div>