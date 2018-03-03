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
    const currentlyReading = books.filter(b => b.shelf === "currentlyReading");
    this.setState({ currentlyReadingList: currentlyReading });

    const wantToRead = books.filter(b => b.shelf === "wantToRead");
    this.setState({ wantToReadList: wantToRead });

    const read = books.filter(b => b.shelf === "read");
    this.setState({ readList: read });
  }

  updateBook(book, shelf) {
    BooksAPI.update(book, shelf).then((result) => {
      this.updateShelves(result);
    });
  }

  updateShelves(bookIdList) {
    const { books } = this.state;
    const currentlyReading = [];
    const wantToRead = [];
    const read = [];
    bookIdList.currentlyReading.map((id) => {
      currentlyReading.push(books.find(b => b.id === id));
      this.setState({ currentlyReadingList: currentlyReading });
    });
    bookIdList.wantToRead.map((id) => {
      wantToRead.push(books.find(b => b.id === id));
      this.setState({ wantToReadList: wantToRead });
    });
    bookIdList.read.map((id) => {
      read.push(books.find(b => b.id === id));
      this.setState({ readList: read });
    });
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
