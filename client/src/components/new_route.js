import React, { Component } from "react";
import "./new_route.css";

export default class NewRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };

    this.search = this.search.bind(this);
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  search() {}

  render() {
    return (
      <div className="map-nav-container">
        <div className="map-nav">
          <div className="map-nav-search">
            <input
              type="text"
              value={this.state.search}
              onChange={this.update("search")}
              placeholder="Enter a location"
              className="input search-input"
            />
            <button onClick={this.search} className="button search-button">
              Search
            </button>
          </div>

          <div>
            <button className="button map-nav__button">Undo</button>
            <button className="button map-nav__button">Clear</button>
          </div>

          <div>
            <button className="button map-nav__button">Ride</button>
            <button className="button map-nav__button">Run</button>
          </div>

          <button className="button button-save">Save</button>
        </div>
      </div>
    );
  }
}
