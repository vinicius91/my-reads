import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import SearchBooks from "./SearchBooks";
import BookShelf from "./BookShelf";
import "./App.css";

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    bookWant: [],
    bookReading: [],
    bookRead: [],
    shelf: ["Currently Reading", "Want to Read", "Read"]
  };

  componentDidMount() {
    const BooksShelf = this.state.shelf;

    BooksAPI.getAll().then(books => {
      this.setState({
        bookWant: books.filter(book => book.shelf === "wantToRead"),
        bookReading: books.filter(book => book.shelf === "currentlyReading"),
        bookRead: books.filter(book => book.shelf === "read")
      });
    });
  }

  componentDidUpdate() {
    console.log(this.state.bookRead);
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.state.shelf.map(shelf => {
                  var books;
                  if (shelf === "Currently Reading") {
                    books = this.state.bookReading;
                  }
                  if (shelf === "Want to Read") {
                    books = this.state.bookWant;
                  }
                  if (shelf === "Read") {
                    books = this.state.bookRead;
                  }
                  return <BookShelf title={shelf} books={books} />;
                })}
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
