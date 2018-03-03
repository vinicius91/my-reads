import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf";
import "./App.css";

const R = require("ramda");

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const byId = R.curry((id, book) => book.id === id);

const byShelf = R.curry((shelf, book) => book.shelf === shelf);

const filterBooks = R.curry((shelf, books) => books.filter(byShelf(shelf)));

const checkIfEmpty = R.curry((bookIdList, shelf) => !bookIdList[shelf].length > 0);

const setStateForNotEmptyBookList = R.curry((books, bookIdList) => {
  const bookShelf = [];
  bookIdList.map((id) => {
    bookShelf.push(books.find(byId(id)));
  });
  return bookShelf;
});

const setStateForBookList = R.curry((bookIdList, shelf, books) => {
  switch (shelf) {
    case "currentlyReading":
      if (checkIfEmpty(bookIdList, shelf)) {
        return [];
      }
      return setStateForNotEmptyBookList(books, bookIdList.currentlyReading);
    case "wantToRead":
      if (checkIfEmpty(bookIdList, shelf)) {
        return [];
      }
      return setStateForNotEmptyBookList(books, bookIdList.wantToRead);
    case "read":
      if (checkIfEmpty(bookIdList, shelf)) {
        return [];
      }
      return setStateForNotEmptyBookList(books, bookIdList.read);
    default:
      return [];
  }
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      currentlyReadingList: [],
      wantToReadList: [],
      readList: []
    };
    this.updateBook = this.updateBook.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books });
        this.setBooks(books);
      })
      .catch(() => {
        console.log("Something went wrong!"); // eslint-disable-line no-console
      });
  }

  setBooks(books) {
    const currentlyReading = filterBooks("currentlyReading", books);
    this.setState({ currentlyReadingList: currentlyReading });

    const wantToRead = filterBooks("wantToRead", books);
    this.setState({ wantToReadList: wantToRead });

    const read = filterBooks("read", books);
    this.setState({ readList: read });
  }

  updateBook(book, shelf) {
    BooksAPI.update(book, shelf).then((result) => {
      console.log(result);
      this.updateShelves(result);
    });
  }

  updateShelves(bookIdList) {
    const { books } = this.state;
    const currentlyReading = setStateForBookList(bookIdList, "currentlyReading", books);
    const wantToRead = setStateForBookList(bookIdList, "wantToRead", books);
    const read = setStateForBookList(bookIdList, "read", books);
    this.setState({ currentlyReadingList: currentlyReading });
    this.setState({ wantToReadList: wantToRead });
    this.setState({ readList: read });
  }

  render() {
    const { classes } = this.props;
    const { currentlyReadingList, wantToReadList, readList } = this.state;
    return (
      <div className="app">
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              MyReads
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <div className="list-books">
          <div className="list-books-content">
            <div className="row">
              <BookShelf
                title="Currently Reading"
                books={currentlyReadingList}
                updateBook={this.updateBook}
              />
              <BookShelf title="Want to Read" books={wantToReadList} updateBook={this.updateBook} />
              <BookShelf title="Read" books={readList} updateBook={this.updateBook} />
            </div>
          </div>
          <div className="open-search">
            <Link to="/search" href="search">
              Add a Book
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(Main);
