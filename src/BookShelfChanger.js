import React, { Component } from "react";
import PropTypes from "prop-types";

class BookShelfChanger extends Component {

  constructor(props) {
    super(props);
    this.state = { shelf: '' };
    this.updateShelf = this.updateShelf.bind(this);
    this.getShelfForUpdate = this.props.getShelfForUpdate.bind(this);
  }

  componentWillMount() {
    this.setState({ 
      shelf: this.props.shelf,
    });
  }

  updateShelf(event) {
    const shelf = event.target.value;
    this.getShelfForUpdate(shelf);
    this.setState({ shelf });
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.state.shelf} onChange={this.updateShelf}>
          <option value="none" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

BookShelfChanger.propTypes = {
  shelf: PropTypes.string.isRequired,
  getShelfForUpdate: PropTypes.func.isRequired
};


export default BookShelfChanger;
