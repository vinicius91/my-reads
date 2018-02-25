import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./Main";
import SearchBooks from "./SearchBooks";
import "./App.css";

class BooksApp extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Main} />
          <Route path="/search" component={SearchBooks} />
        </div>
      </Router>
    );
  }
}

export default BooksApp;
