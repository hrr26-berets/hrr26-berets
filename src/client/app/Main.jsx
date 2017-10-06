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
    loggingIn: false,
    signingUp: false,
    loggedIn: false,
    user: null,
    catalog: {},
    myList:[],
    shoppingList:{}
    };
    this.handleAddToList = this.handleAddToList.bind(this);
    this.handleRemoveFromList = this.handleRemoveFromList.bind(this);
    this.saveList = this.saveList.bind(this);
    this.handleLoggingIn = this.handleLoggingIn.bind(this);
    this.handleSigningUp = this.handleSigningUp.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleListChange = this.handleListChange.bind(this);

  }

  componentDidMount() {
    this.getTrendingItems();
    //this.getCatalog();
  }

  // getCatalog() {
  //   var arr = [1085666,5438,3944,976760]
  //   arr.forEach(item =>
  //     this.getFeaturedList(item));
  // }

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
        this.state.myList = [];
        this.state.shoppingList = res.data;
        this.state.myList = Object.keys(res.data);
        this.state.myList.push('New List');
        this.state.currentListName = this.state.myList[0];
        this.state.currentList = this.state.shoppingList[this.state.myList[0]];
        }
      })
    .catch((err) => {
        console.log(err);
      });
  }

  handleLoggingIn() {
    this.setState({ loggingIn: !this.state.loggingIn });
    this.getmyList();
  }

  handleSigningUp() {
    this.setState({ signingUp: !this.state.signingUp });
  }

  handleSearch(products) {
    this.setState({ searchResults: products })
  }

  handleAddToList(item) {
    var list = this.state.currentList.slice()
    list.push(item)
    this.setState({ currentList: list })
    if (this.state.currentListName === 'Untitled') {
      this.state.myList.unshift('Untitled');
    }
  }

  handleRemoveFromList(item) {
    var list = this.state.currentList.slice()
    var filtered = list.filter(product => product.itemId !== item.itemId)
    this.setState({ currentList: filtered })
  }

  handleNameChange(name) {
    if (this.state.myList[0] === 'Untitled') {
      if (this.state.myList.indexOf(name) === -1) {
        this.state.myList[0] = name;
      }
    }
    this.setState({ currentListName: name })
  }

  handleListChange(list) {
    this.setState( { currentList : list});
  }


 //  getFeaturedList(id) {
 //  axios.get('/feature', {
 //    params: {
 //      query: id
 //    }
 //
 //  })
 //    .then((res) => {
 //     this.state.catalog[id] = res.data;
 //    })
 //    .catch((err) => {
 //      console.log('Error ---> ', err);
 //  })
 // }

  saveList() {
    let saved = {}
    saved[this.state.currentListName] = this.state.currentList;
    console.log(saved)
    let url = (this.state.shoppingList[this.state.currentListName] !== undefined) ? '/save-existing' : '/save'
    let context = this;
    console.log('Url --> ',url);
    axios.post(url, saved)
    .then(function(response) {
      context.getmyList();
      //console.log(response)
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
            <h1 style={{ marginBottom: '0' }}> wishList</h1>
          </div>
          <div className="col-xs-3 text-right">

            {
              (this.props.loggedIn)
                ? <span> Welcome, <strong>{this.props.user}</strong>!&nbsp;&nbsp;<a className="btn btn-link" onClick={this.props.handleLogOut}>Log Out</a>&nbsp;&nbsp;</span>
                : <span>
                <Link to="/signupUser" > <b>Sign Up</b> </Link> &emsp;
                <Link to="/loginUser" > <b>Log In</b> </Link>
                </span>
            }
          </div>
          <div className="col-xs-3">
            <SearchBar handleSearch={this.handleSearch}/>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
           <br /> <h3>Popular Items</h3>
          </div>
          <PopularItems products={this.state.popular} addToList={this.handleAddToList}/>
        </div>
        <div className="row">
          {
            (this.state.searchResults.length !== 0)
              ? <div className="col-xs-12">
                <SearchResults results={this.state.searchResults} addToList={this.handleAddToList}/> <br /><br />
              </div>
              : null

          }
        </div>
        <div className="row">
          {
            (Object.keys(this.state.catalog).length !== 0)
              ?  <div className="col-xs-12">
               <br /> <h3>Featured WishLists</h3>
                <FeaturedLists list={this.state.catalog} addToList={this.handleAddToList}/>
              </div>
              : <div className="col-xs-12">
                <div> Loading Featured Lists... </div>
              </div>
          }
        </div>
        <div className="row">
          <div className="col-xs-12">
         {
            (this.state.myList.length > 0)
         ?  <ShoppingList name={this.state.currentListName} list={this.state.currentList} removeItem={this.handleRemoveFromList} saveList={this.saveList} handleNameChange={this.handleNameChange} handleListChange={this.handleListChange} myList={this.state.myList} shoppingList={this.state.shoppingList}/>
         :
            <ShoppingList name={this.state.currentListName} list={this.state.currentList} removeItem={this.handleRemoveFromList} saveList={this.saveList} handleNameChange={this.handleNameChange}/>
       }
          </div>
        </div>
      </div>
      );
  }
}

export default Main;
