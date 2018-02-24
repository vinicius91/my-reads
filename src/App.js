import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import * as BooksAPI from "./BooksAPI";
import SearchBooks from "./SearchBooks";
import BookShelf from "./BookShelf";
import "./App.css";
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};


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
    const { classes } = this.props;
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
        {this.state.showSearchPage ? (
          <SearchBooks />
        ) : (
          <div className="list-books">
            <div className="list-books-content">
              <div className="row">
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
                  return <BookShelf key={shelf} title={shelf} books={books} />;
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

BooksApp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BooksApp);
