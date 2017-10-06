import React, { Component } from 'react';
import ListItem from './ListItem.jsx';

export default class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.setName = this.setName.bind(this);
    this.state = {
      listName: ''
    }
  }

  handleChange(e) {
    this.setState({
      listName: e.target.value
    })

  }

  setName() {
    var name = this.state.listName;
    this.props.handleNameChange(name);
  }


  render() {
    const { list } = this.props;
    if (this.props.list.length) {
    return(
      <div>
        <h1>{this.props.name}</h1>
          <div className="list-tools">
            <input onChange={this.handleChange} type="text"/>
              <span>
                <button className="btn button-name" type="submit" onClick={this.setName}>Change List Name</button>
              </span>
              <span>
                <button className="btn btn-primary button-save" onClick={this.props.saveList}>Save</button> &emsp;
              </span>
              <span>
                <select id="lists">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
                </select>
              </span>
          </div>
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

