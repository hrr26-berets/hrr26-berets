import React, { Component } from 'react';
import ListItem from './ListItem.jsx';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class ShoppingListEntry extends Component {

  constructor(props) {
    super(props);
    this.handleListChange = this.handleListChange.bind(this);
    this.handleNewList = this.handleNewList.bind(this);
  }

  handleListChange(e) {
    let name = (e.target.value) ? e.target.value : 'Untitled';
    this.props.handleChange(name);
    this.props.setName();
  }

  handleNewList() {
    this.props.newList();
  }

  render() {
    return (
      <div>
        <div className="col-xs-4">
          { (this.props.myList) ?
            <span>
              <select className="form-control" onChange={this.handleListChange} defaultValue={this.props.currentListName}>
                {this.props.myList.map(list => <option key={list}>{list}</option>)}
              </select>
            </span> :
            <span>
              <select>
                <option value="Untitled">Untitled</option>
              </select>
            </span>
          }
          <div style={{'marginTop': '5px', 'marginBottom': '10px'}}>
            <button className="btn btn-info button-name btn-xs" onClick={this.handleNewList}>New List</button>
            <button className="btn btn-success button-name btn-xs" onClick={this.props.saveList}>Save List</button>
            <button className="btn btn-danger button-name btn-xs" onClick={this.props.removeList}>Remove List</button>
          </div>
        </div>
        <div className="col-xs-12">
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
