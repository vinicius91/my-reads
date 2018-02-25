import React, { Component } from "react";
import PropTypes from "prop-types";

class BookShelfChanger extends Component {

  constructor(props) {
    super(props);
    this.state = { shelf: '' };
  }

  componentWillMount() {
    this.setState({ 
      shelf: this.props.shelf,
      getShelfForUpdate: this.props.getShelfForUpdate
    });
  }

  updateShelf(event) {
    console.log(event.target.value);
    this.setState({shelf: event.target.value});
    this.props.getShelfForUpdate(event.target.value);
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.state.shelf} onChange={this.updateShelf.bind(this)}>
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
