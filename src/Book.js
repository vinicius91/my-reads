import React, { Component } from "react";
import PropTypes from "prop-types";
import BookShelfChanger from "./BookShelfChanger";

class Book extends Component {
  static propTypes = {
    backgroundImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired
  };

  render() {
    const { backgroundImage, title, authors } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${backgroundImage}")`
            }}
          />
          <BookShelfChanger />
        </div>
        <div className="book-title">{title}</div>
        {authors.map(author => <div className="book-authors">{author}</div>)}
      </div>
    );
  }
}

export default Book;
