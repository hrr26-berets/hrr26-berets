import React, { Component } from 'react';
import ListItem from './ListItem.jsx';
import ShoppingListEntry from './ShoppingListEntry.jsx';
export default class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleName = this.handleName.bind(this);
    this.setName = this.setName.bind(this);
    this.changeName = this.changeName.bind(this);
    this.handleRename = this.handleRename.bind(this);
    this.cancelRename = this.cancelRename.bind(this);
    this.state = {
      listName: '',
      currentList: this.props.list,
      renaming: false
    };
  }


  handleChange(listName) {
    this.state.listName = listName;
    if (this.props.shoppingList[listName]) {
      this.state.currentList = this.props.shoppingList[listName];
    } else {
      this.state.currentList = [];
    }
    this.setState({ renaming: false });
  }

  handleName(e) {
    this.setState({ listName: e.target.value });
  }

  handleRename() {
    this.setState({ renaming: !this.state.renaming });
  }

  cancelRename() {
    this.setState({ renaming: false });

  }

  setName() {
    var name = this.state.listName;
    this.props.handleNameChange(name);
    if (this.props.shoppingList[name]) {
      this.props.handleListChange(this.props.shoppingList[name]);
    } else {
      this.props.handleListChange([]);
    }
    this.setState({ renaming: false });
  }

  changeName() {
    var name = this.state.listName;
    this.props.handleNameChange(name);
    this.setState({ renaming: false });
  }

  render() {
    const { list } = this.props;
    if (this.props.myList || this.props.list) {
      return (
        <div>
          <div className="list-tools">
            {
              (this.state.renaming)
                ? <span><h3><input onChange={this.handleName} type="text" placeholder={this.props.currentListName}/><button className="btn button-name btn-success btn-xs" type="submit" onClick={this.changeName}>Save</button><button className="btn button-name btn-warning btn-xs" type="submit" onClick={this.cancelRename}>Cancel</button></h3></span>
                : <span><h3>{this.props.currentListName}<div className="divider"/><input onClick={this.handleRename} type="button" className="btn btn-xs" value="Rename"/></h3></span>
            }

            <ShoppingListEntry myList={this.props.myList} shoppingList={this.props.list} removeItem={this.props.removeItem} handleChange={this.handleChange} setName={this.setName} currentListName={this.props.currentListName} newList={this.props.newList} saveList={this.props.saveList} removeList={this.props.removeList}/>

          </div>

        </div>
      );
    }
    return (
      <div>There's nothing in your list yet!</div>
    );
  }
}
