import React, { Component } from "react";
import PropTypes from "prop-types";
import BookShelfChanger from "./BookShelfChanger";

class Book extends Component {

  constructor(props) {
    super(props);
    this.state = {
      book: {
        imageLinks: { thumbnail: '' },
        authors: [''],
        title: '',
        shelf: 'none'
      }
    };
    this.getShelfForUpdate = this.getShelfForUpdate.bind(this);
    if (this.props.book.shelf === undefined) {
      this.props.book.shelf = "none";
    }
    if (this.props.book.authors === undefined) {
      this.props.book.authors = [];
    }

    if (this.props.book.imageLinks === undefined) {
      this.props.book.imageLinks = { thumbnail: '' };
    }
  }

  componentWillMount() {
    this.setState({ book: this.props.book });
  }

  // componentWillUpdate() {
  //   this.setState({book: this.props.book})
  // }

  getShelfForUpdate(shelf) {
    const { book } = this.props;
    book.shelf = shelf;
    this.props.updateBook(book, shelf);
  }

  render() {
    const { imageLinks, title, authors, shelf } = this.state.book;
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${imageLinks.thumbnail}")`
            }}
          />
          <BookShelfChanger shelf={shelf} getShelfForUpdate={this.getShelfForUpdate} />
        </div>
        <div className="book-title">{title}</div>
        {authors.map(author => <div key={author}className="book-authors">{author}</div>)}
      </div>
    );
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  updateBook: PropTypes.func.isRequired
};

export default Book;
