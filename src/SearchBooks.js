import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class SearchBooks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searchTerm: ''
    };
    this.updateBooks = this.updateBooks.bind(this);
    this.updateBook = this.updateBook.bind(this);
  }

  updateBooks(event) {
    if (event.target.value === '') {
      this.setState({searchTerm: event.target.value });
      this.setState({ books: [] });
      return;
    }
    this.setState({searchTerm: event.target.value });
    BooksAPI.search(event.target.value).then((books) => {
      if (books !== undefined) {
        if (books.length !== undefined && books.length > 0) {
          this.setState({ books: books.filter(b => b.shelf === undefined) });
        } else {
          this.setState({ books: [] });
        }
      } else {
        this.setState({ books: [] });
      }
    }).catch((err) => {
      console.log('Error message', err);
    });
  }

  updateBook(book, shelf) {
    const books = this.state.books.filter(b => b.id !== book.id);
    BooksAPI.update(book, shelf).then(() => {
      this.setState({ books });
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    let { searchTerm, books } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={searchTerm} onChange={this.updateBooks} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}>
                <Book
                  book={book}
                  updateBook={this.updateBook}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
