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
        <div>
          { this.props.myList ?
            <span>
              <select onChange={this.change.bind(this)}>
                {this.props.myList.map(list => <option key={list} selected={this.props.currentlist}>{list}</option>)}
              </select>
            </span> :
            <span>
              <select>
                <option value="Untitled">Untitled</option>
              </select>
            </span>
          }
          <button className="btn btn-success button-save btn-xs" onClick={this.props.saveList}>Save List</button>
        </div>
        <div>
          {this.props.shoppingList.map(product =>
            <ListItem
              isInList={true}
              item={product}
              key={product.itemId}
              removeItem={this.props.removeItem}/>
          )}
        </div>
      </div>
    );
  }
}


export default ShoppingListEntry;
