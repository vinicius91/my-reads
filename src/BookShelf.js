import React, { Component } from "react";
import PropTypes from "prop-types";
import Book from "./Book";
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class BookShelf extends Component {
  state = {
    books: [],
  };

  // componentDidMount() {
  //   this.setState.books = this.props.books;
  //   console.log(this.props.books);
  // }

  componentDidMount(){
    this.setState({books: this.props.books})
  }

  
  render() {
    const { title, classes, books, updateBook } = this.props;
    return (
      <div className="bookshelf">
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{title}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
              <ol className="books-grid">
                {books.map(book => (
                  <li key={book.id}>
                    <Book
                      book={book}
                      updateBook={updateBook}
                    />
                  </li>
                ))}
              </ol>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

BookShelf.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  updateBook: PropTypes.func.isRequired
};

export default withStyles(styles)(BookShelf);
