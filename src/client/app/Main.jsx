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
      currentListName: 'Untitled',
      catalog: {},
      myList: [],
      shoppingList: {}
    };
    this.handleAddToList = this.handleAddToList.bind(this);
    this.handleRemoveFromList = this.handleRemoveFromList.bind(this);
    this.saveList = this.saveList.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleListChange = this.handleListChange.bind(this);
    this.getmyList = this.getmyList.bind(this);
    this.getFeaturedList = this.getFeaturedList.bind(this);
    this.getCatalog = this.getCatalog.bind(this);
  }

  componentDidMount() {
    this.getTrendingItems();
    if ( this.props.loggedIn) {
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
          arr.push('New List');
          this.setState({
            myList: arr,
            currentListName: (this.state.currentListName) ? this.state.currentListName : arr[0],
            shoppingList: collection,
            currentList: (this.state.currentList) ? this.state.currentList : collection[arr[0]]
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
    var list = this.state.currentList.slice();
    list.push(item);
    this.setState({ currentList: list });
  }

  handleRemoveFromList(id) {
    var list = this.state.currentList.slice();
    var filtered = list.filter(product => product.itemId !== id);
    this.setState({ currentList: filtered });
  }

  handleNameChange(name) {
    if (this.state.myList[0] === 'Untitled') {
      if (this.state.myList.indexOf(name) === -1) {
        let list = this.state.myList.slice();
        list[0] = name;
        this.setState({myList: list});
      }
    }
    this.setState({ currentListName: name });
  }

  handleListChange(list) {
    this.setState( { currentList: list});
  }

  getFeaturedList(id) {
    axios.get('/feature', {
      params: {
        query: id
      }
    })
      .then((res) => {
        console.log('res.data --> ',res.data[0])
        let catalog = Object.assign({}, this.state.catalog);
        catalog[id] = res.data;
        this.setState({ catalog });
       // console.log('Catalog --> ',this.state.catalog);
      })
      .catch((err) => {
        console.log('Error ---> ', err);
      });
  }

  saveList() {
    let saved = {};
    saved[this.state.currentListName] = this.state.currentList;
    console.log(saved);
    let url = (this.state.shoppingList[this.state.currentListName] !== undefined) ? '/save-existing' : '/save';
    axios.post(url, saved)
      .then(response => {
        // this.setState({ myList: [] });
        this.getmyList();
      })
      .catch(function(error) {
        console.log(error);
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
            name={this.state.currentListName}
            list={this.state.currentList}
            removeItem={this.handleRemoveFromList}
            saveList={this.saveList}
            handleNameChange={this.handleNameChange}
            handleListChange={this.handleListChange}
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
        {FeaturedListContainer}
        <div className="row">
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
