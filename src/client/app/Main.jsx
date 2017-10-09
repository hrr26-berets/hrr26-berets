import React, { Component } from 'react';
import axios from 'axios';
import PopularItems from './PopularItems.jsx';
import SearchBar from './SearchBar.jsx';
import FeaturedLists from './FeaturedLists.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import SearchResults from './SearchResults.jsx';
import ShoppingList from './ShoppingList.jsx';
import { Route, Link, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popular: [],
      searchResults: [],
      currentList: [],
      currentListName: '',
      catalog: {},
      myList: [],
      shoppingList: {}
    };
    this.handleAddToList = this.handleAddToList.bind(this);
    this.handleRemoveFromList = this.handleRemoveFromList.bind(this);
    this.createList = this.createList.bind(this);
    this.saveList = this.saveList.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleListChange = this.handleListChange.bind(this);
    this.getmyList = this.getmyList.bind(this);
    this.getFeaturedList = this.getFeaturedList.bind(this);
    this.getCatalog = this.getCatalog.bind(this);
    this.removeList = this.removeList.bind(this);
    this.handleRenameList = this.handleRenameList.bind(this);
    this.renameList = this.renameList.bind(this);
  }

  componentDidMount() {
    this.getTrendingItems();
    if (this.props.loggedIn) {
      this.getmyList();
    }
     this.getCatalog();
  }

  getCatalog() {
    var arr = [1085666, 5438, 3944, 976760];
    // var arr = [3944];
    arr.forEach(item => this.getFeaturedList(item));
  }

  getTrendingItems() {
    axios.get('/trending')
      .then((res) => {
        this.setState({
          popular: res.data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getmyList() {
    axios.get('/myLists')
      .then((res) => {
        if (res.data) {
          let arr = Object.keys(res.data);
          let collection = res.data;
          this.setState({
            myList: arr,
            currentListName: arr[0],
            shoppingList: collection,
            currentList: collection[arr[0]]
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSearch(products) {
    this.setState({ searchResults: products });
  }

  handleAddToList(item) {
    if (!this.props.loggedIn) {
      return alert('Please Log In to Continue');
    }
    let list = this.state.currentList.slice();
    list.push(item);
    this.setState({ currentList: list });
  }

  handleRemoveFromList(id) {
    let list = this.state.currentList.slice();
    let filtered = list.filter(product => product.itemId !== id);
    this.setState({ currentList: filtered });
  }

  handleNameChange(name) {
    if (this.state.myList[0] === 'Untitled' && this.state.myList.indexOf(name) === -1) {
      let listNames = this.state.myList.slice();
      listNames[0] = name;
      this.setState({myList: listNames});
    }
    let oldName = this.state.currentListName;
    let oldList = this.state.shoppingList[oldName];
    this.setState({ currentListName: name });
  }

  handleListChange(list) {
    this.setState( { currentList: list });
  }

  getFeaturedList(id) {
    axios.get('/feature', {
      params: {
        query: id
      }
    })
      .then((res) => {
        let catalog = Object.assign({}, this.state.catalog);
        catalog[id] = res.data;
        this.setState({ catalog });
        // console.log('Catalog --> ',this.state.catalog);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  saveList() {
    let saved = {};
    saved[this.state.currentListName] = this.state.currentList;
    let url = (this.state.shoppingList[this.state.currentListName] !== undefined) ? '/save-existing' : '/save';
    axios.post(url, saved)
      .then((res) => {
        let updatedList = res.data.shoppingList;
        this.setState({
          shoppingList: updatedList,
          currentList: (updatedList[this.state.currentListName]) ? updatedList[this.state.currentListName] : [],
          currentListName: (this.state.currentListName) ? this.state.currentListName : 'Untitled',
          myList: Object.keys(updatedList)
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createList() {
    axios.post('/create-list')
      .then((res) => {
        return res.data.shoppingList;
      })
      .then((updatedList) => {
        const oldListNames = this.state.myList;
        const newListNames = Object.keys(updatedList);
        newListNames.forEach((name) => {
          if (!(oldListNames.includes(name))) {
            this.setState({
              shoppingList: updatedList,
              currentList: updatedList[name],
              currentListName: name,
              myList: Object.keys(updatedList)
            });
            return;
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  removeList() {
    let currentListName = this.state.currentListName;
    axios.put('/remove-list', currentListName)
      .then((res) => {
        this.getmyList();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleRenameList(newName) {
    let oldName = this.state.currentListName;
    this.renameList(oldName, newName);
  }

  renameList(oldName, newName) {
    let names = [oldName, newName];
    axios.put('/rename-list', names)
      .then((res) => {
        return res.data.shoppingList;
      })
      .then((updatedList) => {
        const oldListNames = this.state.myList;
        const newListNames = Object.keys(updatedList);

        if (!oldListNames.includes(newName)) {
          this.setState({
            shoppingList: updatedList,
            currentList: updatedList[newName],
            currentListName: newName,
            myList: Object.keys(updatedList)
          });
        } else {
          newListNames.forEach((name) => {
            if (!(oldListNames.includes(name))) {
              this.setState({
                shoppingList: updatedList,
                currentList: updatedList[name],
                currentListName: name,
                myList: Object.keys(updatedList)
              });
              return;
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    let NavContainer = (
      <span>
        <Link to="/signupUser" > <b>Sign Up</b> </Link> &emsp;
        <Link to="/loginUser" > <b>Log In</b> </Link>
      </span>
    );
    if (this.props.loggedIn) {
      NavContainer = (
        <span> Welcome, <strong>{this.props.user}</strong>!&nbsp;&nbsp;
          <a className="btn btn-link" onClick={this.props.handleLogOut}>
          Log Out
          </a>
        &nbsp;
        &nbsp;
        </span>
      );
    }

    let PopularItemsContainer = (
      <div className="col-xs-12">
        <br />
        <h3> Popular Items</h3>
        <div>Loading Popular Items...</div><br />
      </div>
    );
    if (this.state.popular.length) {
      PopularItemsContainer = (
        // <div id='whitebox-popular'>
        <div className="col-xs-12" id="whitebox-popular">
          <br />
          <h3>Popular Items</h3>
          <PopularItems
            products={this.state.popular}
            addToList={this.handleAddToList}
            removeItem={this.handleRemoveFromList}
            currentList={this.state.currentList}/>
        </div>
        // </div>
      );
    }

    let SearchResultsContainer = null;
    if (this.state.searchResults.length) {
      SearchResultsContainer = (
        <div className="col-xs-12">
          <SearchResults
            results={this.state.searchResults}
            addToList={this.handleAddToList}
            removeItem={this.handleRemoveFromList}
            currentList={this.state.currentList}/>
          <br />
          <br />
        </div>
      );
    }

    let ShoppingContainer = <div>Log in to see your lists!</div>;
    if (this.props.loggedIn) {
      ShoppingContainer = (
        <div className="col-xs-12">
          <br /><ShoppingList
            currentListName={this.state.currentListName}
            list={this.state.currentList}
            removeItem={this.handleRemoveFromList}
            removeList={this.removeList}
            newList={this.createList}
            saveList={this.saveList}
            handleNameChange={this.handleNameChange}
            handleListChange={this.handleListChange}
            handleRenameList={this.handleRenameList}
            myList={this.state.myList}
            shoppingList={this.state.shoppingList}
            currentList={this.state.currentList}/>
        </div>
      );
    }

    let FeaturedListContainer = <div>Loading Featured Lists...</div>;
    if (Object.keys(this.state.catalog).length === 4) {
      FeaturedListContainer = (
        <div className="col-xs-12">
          <br /> <h3>Featured WishLists</h3>
          <FeaturedLists
            list={this.state.catalog}
            addToList={this.handleAddToList}
            removeItem={this.handleRemoveFromList}
            currentList={this.state.currentList}/>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row" style={{display: 'flex', alignItems: 'flex-end'}}>
          <div className="col-xs-4">
            <br /><br /><h1 style={{ marginBottom: '0' }}> <div id='title'> wishList </div></h1>
          </div>
          {/* Nav buttons: render Login, Signup if a user isn't logged in,
          render 'Welcome <username>', Logout if a user is logged in */}
          <div className="col-xs-3 text-right">
            {NavContainer}
          </div>
          {/* Search bar component */}
          <div className="col-xs-3">
            <SearchBar handleSearch={this.handleSearch}/>
          </div>
        </div><br /><br />
        {/* Popular items retrieved from Walmart's 'Trending' api */}
        <div className="row">
          {PopularItemsContainer}
        </div><br />
        {/* Search results render here */}
        <div className="row">
          {SearchResultsContainer}
        </div>
        {/* Featured wishlists based on best-selling items in the Walmart catalog */}
        <div className="row">
          {FeaturedListContainer}
        </div>
        {/* User's current shopping list */}
        <div className="row">
          { ShoppingContainer}
        </div>
      </div>
    );
  }
}

export default Main;
