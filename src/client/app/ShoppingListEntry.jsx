import React, { Component } from 'react';
import ListItem from './ListItem.jsx';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class ShoppingListEntry extends Component {

  constructor(props) {
    super(props);
  }

  change(event) {
    var name = (event.target.value === 'New List') ? 'Untitled' : event.target.value;

      this.props.handleChange(name);
      this.props.setName();
  }

  render() {
    return (
      <div>
        {
          (this.props.myList)
       ? <div>
        <select onChange={this.change.bind(this)}>
         {this.props.myList.map(list => <option key={list} selected={this.props.currentlist}>{list}</option>)}
         </select>
        </div>
        : <div>
            <select>
              <option value="Untitled">Untitled</option>
              </select>
            </div>
        }
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
