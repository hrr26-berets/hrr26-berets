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

class Main extends Component {
  constructor(props) {
    super(props);
    this.handleAddToList = this.handleAddToList.bind(this)
    this.handleRemoveFromList = this.handleRemoveFromList.bind(this)
    this.saveList = this.saveList.bind(this)
    this.state = {
      popular: [],
    searchResults: [],
    currentList: [],
    currentListName: 'Untitled',
    loggingIn: false,
    signingUp: false,
    loggedIn: false,
    user: null,
    catalog:{}
    };
  }

  componentDidMount() {
    this.getTrendingItems();
    this.getCatalog();
   // this.getFeaturedList(); 
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

  handleLogIn(user) {
    axios.post('/login', user)
      .then((res) => {
        this.setState({
          loggedIn: true,
          user: user.username,
          loggingIn: false
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSignUp(user) {
    axios.post('/signup', user)
      .then((res) => {
        this.setState({
          loggedIn: true,
          user: user.username,
          signingUp: false
        })
      })
      .catch((err) => {
        console.log(err);
      });

  }

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
  //console.log('Id --> ',id);
  axios.get('/feature', {
    params: {
      query: id
    }

  })
    .then((res) => {
     // this.catalog[id] = res.data;
    // console.log('Res --> ',res.data);
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
    axios.post('http://localhost:3000/save', saved)
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
            <Modal
              isOpen={this.state.loggingIn}
              onRequestClose={this.handleLoggingIn.bind(this)}
              contentLabel="Login"
              style={{
                content: {
                  position: 'absolute',
                  height: '320px',
                  width: '350px',
                  left: '35%',
                  right: '35%',
                  bottom: '35%'
                }
              }}
            >
              <Login onLoginSubmit={this.handleLogIn.bind(this)}/>
            </Modal>
            <Modal
              isOpen={this.state.signingUp}
              onRequestClose={this.handleSigningUp.bind(this)}
              contentLabel="Signup"
              style={{
                content: {
                  position: 'absolute',
                  height: '320px',
                  width: '350px',
                  left: '35%',
                  right: '35%',
                  bottom: '35%'
                }
              }}
            >
              <Signup onSignupSubmit={this.handleSignUp.bind(this)}/>
            </Modal>
            {
              (this.state.loggedIn)
                ? <span> Welcome, <strong>{this.state.user}</strong>!&nbsp;&nbsp;<a className="btn btn-link" onClick={this.handleLogOut.bind(this)}>Log Out</a>&nbsp;&nbsp;</span>
                : <span><a className="btn btn-link" onClick={this.handleLoggingIn.bind(this)}>Log In</a>&nbsp;&nbsp;
                  <a className="btn btn-link" onClick={this.handleSigningUp.bind(this)}>Sign Up</a>&nbsp;&nbsp;</span>
            }
          </div>
          <div className="col-xs-5">
            <SearchBar handleSearch={this.handleSearch.bind(this)}/>
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
              : 
                  (Object.keys(this.state.catalog).length !== 0)
                  ?  <div className="col-xs-12">
                      <h3>Featured WishLists</h3>
                      <FeaturedLists list={this.state.catalog}/>
                    </div>
                  : <div className="col-xs-12">
                      <div> This is a test </div>
                    </div>

          }
        </div>
        <div className="row">
          <div className="col-xs-12">
          <ShoppingList name={this.state.currentListName} list={this.state.currentList} removeItem={this.handleRemoveFromList} saveList={this.saveList}/>
          </div>
        </div>
      </div>
      );
  }
}

export default Main;
