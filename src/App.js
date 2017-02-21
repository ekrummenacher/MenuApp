import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var uuid = require('uuid');
var firebase = require('firebase');

var config = {
  apiKey: "AIzaSyD8XcYM7cNleTazrqM3knC6Nizasss6UrA",
  authDomain: "menuapp-78e15.firebaseapp.com",
  databaseURL: "https://menuapp-78e15.firebaseio.com",
  storageBucket: "menuapp-78e15.appspot.com",
  messagingSenderId: "578423643450"
};
firebase.initializeApp(config);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menu: [],
      submitted: false,
      edit: false,
    }
  }

  componentDidMount() {
    this._loadFirebaseData();
  }

  //loading the data from firebase
  _loadFirebaseData() {
    var self = this;

    this.setState({ menu: [] })
    //getting data from firebase
    firebase.database().ref().once('value').then((snapshot) => {
      snapshot.forEach(function (data) {
        self.setState({
          menu: self.state.menu.concat(data.val()),
        });
      });
    });
    console.log("Firebase loaded");
  }


  onSubmit(event) {

    event.preventDefault();

    //creating our initial variables (const = var)
    const details = {};
    const id = uuid.v1(); //generating our unique key

    //go through each element in the form making sure it's an input element
    event.target.childNodes.forEach(function (el) {
      if (el.tagName === 'INPUT') {
        details[el.name] = el.value
      } else {
        el.value = null
      }
      //adding one more element uuid
      details['uuid'] = id;
    })

    firebase.database().ref('menuApp/' + id).set({
      menu: details
    });

    this.setState({
      submitted: true
    })

    this.setState({
      edit: false
    })

    console.log("The data is submitted to menu");

    this._loadFirebaseData();
  }


  render() {
    var menuForm1;
    var menuForm2;
    var menuForm3;
    var rows1;
    var rows2;
    var rows3;
    var table1;
    var table2;
    var table3;
    var output;

    menuForm1 = (
      <div className="input-form">
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" name="name1" placeholder="Enter Drink Name..." />
          <input type="text" name="price1" placeholder="Enter Drink Price..." />
          <input type="text" name="description1" placeholder="Enter Drink Description..." />
          <button type="submit">Submit</button>
        </form>
      </div>
    );

    menuForm2 = (
      <div className="input-form">
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" name="name2" placeholder="Enter Drink Name..." />
          <input type="text" name="price2" placeholder="Enter Drink Price..." />
          <input type="text" name="description2" placeholder="Enter Drink Description..." />
          <button type="submit">Submit</button>
        </form>
      </div>
    );

    menuForm3 = (
      <div className="input-form">
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" name="name3" placeholder="Enter Drink Name..." />
          <input type="text" name="price3" placeholder="Enter Drink Price..." />
          <input type="text" name="description3" placeholder="Enter Drink Description..." />
          <button type="submit">Submit</button>
        </form>
      </div>
    );

    rows1 = this.state.menu.map(function (item, index) {
      return Object.keys(item).map(function (s) {

        return (
          <div className="drink-rows" key={s}>
            <tr>
              <th width="70%"> {item[s].menu.name1} </th>
              <th width="30%"> {item[s].menu.price1} </th>
            </tr>
            <tr colspan="2">
              <td> {item[s].menu.description1} </td>
              {/*<th>
                                <button value={item[s].inventory.uuid} onClick={self._handleClick.bind(self)}>Delete</button>
                                <button value={item[s].inventory.uuid} onClick={self._setFirebaseDataEditTable.bind(self)}>Edit</button>
                            </th>*/}
            </tr>
          </div>
        )
      });
    });

    rows2 = this.state.menu.map(function (item, index) {
      return Object.keys(item).map(function (s) {

        return (
          <div key={s}>
            <tr className="drink-rows">
              <th> {item[s].menu.name2} </th>
              <th> {item[s].menu.price2} </th>
            </tr>
            <tr>
              <td> {item[s].menu.description2} </td>
              {/*<th>
                                <button value={item[s].inventory.uuid} onClick={self._handleClick.bind(self)}>Delete</button>
                                <button value={item[s].inventory.uuid} onClick={self._setFirebaseDataEditTable.bind(self)}>Edit</button>
                            </th>*/}
            </tr>
          </div>
        )
      });
    });

    rows3 = this.state.menu.map(function (item, index) {
      return Object.keys(item).map(function (s) {
        return (
          <div key={s}>
            <tr className="drink-rows">
              <th> {item[s].menu.name3} </th>
              <th> {item[s].menu.price3} </th>
            </tr>
            <tr>
              <td> {item[s].menu.description3} </td>
              {/*<th>
                                <button value={item[s].inventory.uuid} onClick={self._handleClick.bind(self)}>Delete</button>
                                <button value={item[s].inventory.uuid} onClick={self._setFirebaseDataEditTable.bind(self)}>Edit</button>
                            </th>*/}
            </tr>
          </div>
        )
      });
    });

    table1 = (
      <div className="table-1">
        <table>
          <tbody>
            {rows1}
          </tbody>
        </table>
      </div>
    );

    table2 = (
      <div className="table-2">
        <table>
          <tbody>
            {rows2}
          </tbody>
        </table>
      </div>
    );

    table3 = (
      <div className="table-3">
        <table>
          <tbody>
            {rows3}
          </tbody>
        </table>
      </div>
    );


    return (
      output =
      <div className="App">
        <div className="App-header">
          <h1>MenuMaker</h1>
          <h2>Moving Sidewalk Menu</h2>
        </div>
        <div className="App-body">
          <div className="arrivals table-2 table-3">
            <div>
              <hr />
              <h2 className="drink-section-title">ARRIVALS</h2>
              <h3>flavored daiquiries</h3>
            </div>
            <div className="drink-table">
              {table1}
            </div>
            <div>
              {menuForm1}
            </div>
          </div>
          <div className="departures table-1 table-3">
            <div>
              <h2 className="drink-section-title">DEPARTURES</h2>
              <h3>daiquiri variations</h3>
            </div>
            <div className="drink-table">
              {table2}
            </div>
            <div>
              {menuForm2}
            </div>
          </div>
          <div className="international table-1 table-2">
            <div>
              <h2 className="drink-section-title">INTERNATIONAL DESTINATIONS</h2>
              <h3>other house cocktails</h3>
            </div>
            <div className="drink-table">
              {table3}
            </div>
            <div>
              {menuForm3}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
