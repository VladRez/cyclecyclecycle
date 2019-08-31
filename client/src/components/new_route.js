import React, { Component } from "react";
import "./new_route.css";
import ReactMapGL from "react-map-gl";
import MapboxAPIKey from "../api_keys/mapbox_api_key";

export default class NewRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      viewport: {
        width: "100%",
        height: "100%",
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      }
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
      <div>
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
        <div className="mapbox-container">
          <ReactMapGL
            {...this.state.viewport}
            mapboxApiAccessToken={MapboxAPIKey}
            onViewportChange={viewport => this.setState({ viewport })}
          />
        </div>
      </div>
    );
  }
}
