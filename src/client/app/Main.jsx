import React, { Component } from 'react';
import Modal from 'react-modal';
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
    loggingIn: false,
    signingUp: false,
    // loggedIn: false,
    user: null,
    catalog: {}
    };
    this.handleAddToList = this.handleAddToList.bind(this);
    this.handleRemoveFromList = this.handleRemoveFromList.bind(this);
    this.saveList = this.saveList.bind(this);
    this.handleLoggingIn = this.handleLoggingIn.bind(this);
    this.handleSigningUp = this.handleSigningUp.bind(this);
   // this.handleLogIn = this.handleLogIn.bind(this);
    //this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);

  }

  componentDidMount() {
    this.getTrendingItems();
    this.getCatalog();
  }

  getCatalog() {
    var arr = [1085666,5438,3944,976760]
    arr.forEach(item =>
      this.getFeaturedList(item));
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

  handleLoggingIn() {
    this.setState({ loggingIn: !this.state.loggingIn });
  }

  handleSigningUp() {
    this.setState({ signingUp: !this.state.signingUp });
  }

  // handleLogIn(user) {
  //   axios.post('/login', user)
  //     .then((res) => {
  //       this.setState({
  //         loggedIn: true,
  //         user: user.username,
  //         loggingIn: false
  //       })
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // handleSignUp(user) {
  //   axios.post('/signup', user)
  //     .then((res) => {
  //       this.setState({
  //         loggedIn: true,
  //         user: user.username,
  //         signingUp: false
  //       })
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  // }

  handleLogOut() {
    axios.get('/logout')
      .then((res) => {
        this.setState({
          loggedIn: false,
          user: null
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSearch(products) {
    this.setState({ searchResults: products })
  }

  handleAddToList(item) {
    var list = this.state.currentList.slice()
    list.push(item)
    this.setState({ currentList: list })
  }

  handleRemoveFromList(item) {
    var list = this.state.currentList.slice()
    var filtered = list.filter(product => product.itemId !== item.itemId)
    this.setState({ currentList: filtered })
  }

  handleNameChange(name) {
    this.setState({ currentListName: name })
  }


  getFeaturedList(id) {
  axios.get('/feature', {
    params: {
      query: id
    }

  })
    .then((res) => {
     this.state.catalog[id] = res.data;
    })
    .catch((err) => {
      console.log('Error ---> ', err);
  })
 }

  saveList() {
    var saved = {}
    saved[this.state.currentListName] = this.state.currentList;
    console.log(saved)
    axios.post('/save', saved)
    .then(function(response) {
      console.log(response)
    })
    .catch(function(error) {
      console.log(error)
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row" style={{display: 'flex', alignItems: 'flex-end'}}>
          <div className="col-xs-4">
            <h1 style={{ marginBottom: '0' }}>wishlist</h1>
          </div>
          <div className="col-xs-3 text-right">

            {
              (this.props.loggedIn)
                ? <span> Welcome, <strong>{this.props.user}</strong>!&nbsp;&nbsp;<a className="btn btn-link" onClick={this.handleLogOut}>Log Out</a>&nbsp;&nbsp;</span>
                : <span>
                <Link to="/signupUser" > Sign Up </Link> &emsp;
                <Link to="/loginUser" > Log In </Link>
                </span>
            }
          </div>
          <div className="col-xs-5">
            <SearchBar handleSearch={this.handleSearch}/>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <h3>Popular Items</h3>
          </div>
          <PopularItems products={this.state.popular} addToList={this.handleAddToList}/>
        </div>
        <div className="row">
          {
            (this.state.searchResults.length !== 0)
              ? <div className="col-xs-12">
                <SearchResults results={this.state.searchResults} addToList={this.handleAddToList}/>
              </div>
              : null

          }
        </div>
        <div className="row">
          {
            (Object.keys(this.state.catalog).length !== 0)
              ?  <div className="col-xs-12">
                <h3>Featured WishLists</h3>
                <FeaturedLists list={this.state.catalog} addToList={this.handleAddToList}/>
              </div>
              : <div className="col-xs-12">
                <div> Loading Featured Lists... </div>
              </div>
          }
        </div>
        <div className="row">
          <div className="col-xs-12">
          <ShoppingList name={this.state.currentListName} list={this.state.currentList} removeItem={this.handleRemoveFromList} saveList={this.saveList} handleNameChange={this.handleNameChange}/>
          </div>
        </div>
      </div>
      );
  }
}

export default Main;
