import React, { Component } from 'react';
import ListItem from './ListItem.jsx';
import ShoppingListEntry from './ShoppingListEntry.jsx';
export default class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleName = this.handleName.bind(this)
    this.setName = this.setName.bind(this);
    this.changeName = this.changeName.bind(this);
    this.state = {
      listName: '',
      currentList:this.props.list
    }
  }


  handleChange(listName) {
    this.state.listName = listName;
    if (this.props.shoppingList[listName]) {
      this.state.currentList = this.props.shoppingList[listName];
    } else {
      this.state.currentList = [];
    }
  }

  handleName(e) {
    this.setState({listName : e.target.value})
  }


  setName() {
    var name = this.state.listName;  
    this.props.handleNameChange(name);
    if (this.props.shoppingList[name]) {
      this.props.handleListChange(this.props.shoppingList[name]);
    } else {
      this.props.handleListChange([]);
    }
  }
  changeName() {
    var name = this.state.listName;
    this.props.handleNameChange(name);
  }


  render() {
    const { list } = this.props;
   // console.log('This list ---> ',this.props.myList);
    if (this.props.myList || this.props.list) {
    return(
      <div>
        <h1>{this.props.name}</h1>
          <div className="list-tools">
            <input onChange={this.handleName} type="text"/>
              <span>
                <button className="btn button-name" type="submit" onClick={this.changeName}>Change List Name</button>
              </span>
              <span>
                <button className="btn btn-primary button-save" onClick={this.props.saveList}>Save</button> &emsp;
              </span>
     
              <ShoppingListEntry myList={this.props.myList} shoppingList={this.props.list} removeItem={this.props.removeItem} handleChange={this.handleChange} setName={this.setName} currentList={this.props.name}/>

          </div>

      </div>
    )
  }
  return (
    <div>There's nothing in your list yet!</div>
    )
  }
}
