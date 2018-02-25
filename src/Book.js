import React, { Component } from "react";
import PropTypes from "prop-types";
import BookShelfChanger from "./BookShelfChanger";

class Book extends Component {

  constructor(props) {
    super(props);
    this.getShelfForUpdate = this.getShelfForUpdate.bind(this);
  }

  getShelfForUpdate(shelf) {
    this.props.updateBook(this.props.book, shelf);
  }


  render() {
    const { imageLinks, title, authors, shelf } = this.props.book;
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
