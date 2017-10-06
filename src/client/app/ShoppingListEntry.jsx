import React, { Component } from 'react';
import ListItem from './ListItem.jsx';
import Select from 'react-select';

class ShoppingListEntry extends Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   currentlist:this.props.shoppingList
    // }
  }

  change(event) {
    var name = (event.target.value === 'New List') ? 'Untitled' : event.target.value;
      
      this.props.handleChange(name);
      this.props.setName();
   // this.setState({currentlist: this.props.shoppingList[name]});
  }

  render() {
    return (
      <div>
         <select onChange={this.change.bind(this)}>
         {this.props.myList.map(list => <option key={list} selected={this.props.currentlist}>{list}</option>)}
         </select>
          <div>
            {this.props.shoppingList.map(product =>
              <ListItem product={product} key={product.itemId} removeItem={this.props.removeItem}/>
            )}
        </div>
      </div>
  )


 }
}


export default ShoppingListEntry
