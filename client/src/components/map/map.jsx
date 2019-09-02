import React from "react";
// eslint-disable-next-line
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
// eslint-disable-next-line
import { Link } from "react-router-dom";
import {
  Map,
  GoogleApiWrapper,
  Marker,
  DirectionsRenderer,
  DirectionsService
} from "google-maps-react";
import "./map.css";
// eslint-disable-next-line
const { LOGIN_USER } = Mutations;
const mapStyles = {
  width: "100%",
  height: "100%"
};
class GMaps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: []
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick(t, map, coord) {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    this.setState(previousState => {
      return {
        markers: [
          ...previousState.markers,
          {
            title: "",
            name: "",
            position: { lat, lng }
          }
        ]
      };
    });
  }

  render() {
    console.log(this.state.markers);
    return (
      <div>
        <h1 className="text-center">My Maps</h1>
        <Map
          google={this.props.google}
          style={{ width: "100%", margin: "auto", height: "80%" }}
          className={"map"}
          zoom={14}
          onClick={this.onClick}
        >
          {this.state.markers.map((marker, index) => (
            <Marker
              key={index}
              title={marker.title}
              name={marker.name}
              position={marker.position}
            />
          ))}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ""
})(GMaps);
