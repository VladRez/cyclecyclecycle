import React from "react";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import { Redirect } from "react-router-dom";
import Mutations from "../../graphql/mutations";
import "./route.css";
import mapOptions from "./gMapOptions";
const { CREATE_MAP } = Mutations;

class RouteMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      routes: [],
      TravelMode: "WALKING",
      routeType: "polyline",
      route_details: {},
      modal: false,
      route_name: "",
      route_description: ""
    };

    this.clearMap = this.clearMap.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const map = this.refs.map;

    this.map = new window.google.maps.Map(map, mapOptions);
    const directionsDisplay = new window.google.maps.DirectionsRenderer();
    this.directionsDisplay = directionsDisplay;
    this.directionsDisplay.setMap(this.map);
    const directionsService = new window.google.maps.DirectionsService();
    this.directionsService = directionsService;
    this.handleClick();

    const directionPolyLine = new window.google.maps.Polyline({
      path: [],
      geodesic: true,
      strokeColor: "#000",
      strokeOpacity: 0.6,
      strokeWeight: 5
    });

    this.directionPolyLine = directionPolyLine;
    this.directionPolyLine.setMap(this.map);
    this.markerArray = [];
  }

  handleClick() {
    window.google.maps.event.addListener(this.map, "click", event => {
      let point = {
        location: {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        },
        stopover: false
      };

      this.setState({ routes: [...this.state.routes, point] });

      this.calculateAndDisplayRoute();
    });
  }

  calculateAndDisplayRoute(opt = {}) {
    let origin = opt.origin || this.state.routes[0].location;
    let destination =
      opt.destination ||
      this.state.routes[this.state.routes.length - 1].location;
    let waypoints =
      opt.waypoints || this.state.routes.slice(1, this.state.routes.length - 1);
    let travelMode = opt.travelMode || this.state.TravelMode; //window.google.maps.TravelMode.WALKING;
    let optimizeWaypoints = opt.optimizeWaypoints || false;

    let options = {
      origin,
      destination,
      waypoints,
      optimizeWaypoints,
      travelMode
    };

    this.directionsService.route(options, (res, status) => {
      if (status === "OK") {
        this.markerArray.forEach(marker => marker.setMap(null));
        this.setState({ route_details: res.routes[0].legs[0] });

        let start = new window.google.maps.Marker({
          position: this.state.routes[0].location,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 4
          },
          map: this.map
        });
        this.markerArray.push(start);
        if (this.state.routes.length > 1) {
          let finish = new window.google.maps.Marker({
            position: this.state.routes[this.state.routes.length - 1].location,
            icon: {
              path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
              scale: 4
            },
            map: this.map
          });
          this.markerArray.push(finish);
        }
        if (this.state.routeType === "polyline") {
          this.renderPolyLine(res);
        } else {
          this.directionsDisplay.setDirections(res);
        }
      } else {
      }
    });
  }

  renderPolyLine(res) {
    // this.directionPolyLine.setMap(null);
    this.directionPolyLine.setPath(res.routes[0].overview_path);
  }

  clearMap() {
    this.setState({ routes: [], route_details: {} });
    this.directionPolyLine.setPath([]);
    this.markerArray.forEach(marker => marker.setMap(null));
  }

  openModal() {
    this.setState({ modal: true });
  }

  closeModal() {
    this.setState({ modal: false });
  }

  handleSubmit(e) {
    let mapData = {
      name: this.state.route_name,
      description: this.state.route_description,
      travelMode: this.state.TravelMode,
      routes: this.state.routes
    };
    return mapData;
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  changeTravelMode() {
    if (this.state.TravelMode === "WALKING") {
      this.setState({ TravelMode: "BICYCLING" });
      if (this.state.routes.length)
        this.calculateAndDisplayRoute({ travelMode: "BICYCLING" });
    } else {
      this.setState({ TravelMode: "WALKING" });
      if (this.state.routes.length)
        this.calculateAndDisplayRoute({ travelMode: "WALKING" });
    }
  }

  render() {
    let distance = this.state.route_details.distance
      ? this.state.route_details.distance.text
      : "0";

    let duration = this.state.route_details.duration
      ? this.state.route_details.duration.text
      : "0";
    let RouteType = this.state.TravelMode === "WALKING" ? "Run" : "Ride";
    let OtherRouteType = this.state.TravelMode === "WALKING" ? "Ride" : "Run";

    let modal = this.state.modal ? (
      <div className="modal">
        <div className="modal-form-container">
          <header>Save</header>
          <Mutation
            mutation={CREATE_MAP}
            onCompleted={data => {
              this.props.history.push(`/routes/${data.addMap._id}`);
            }}
          >
            {CreateMap => (
              <div className="modal-form-content">
                <form
                  className="modal-form"
                  onSubmit={e => {
                    e.preventDefault();
                    this.handleSubmit(e);
                    if (this.state.routes.length)
                    CreateMap({
                      variables: {
                        name: this.state.route_name,
                        description: this.state.route_description,
                        travelMode: this.state.TravelMode,
                        routes: this.state.routes,
                        userId: localStorage.currentUserId
                      }
                    });
                  }}
                >
                  Enter a name and description for your route below. On the next
                  page, you'll be able to see your route.
                  <div className="modal-inline-inputs">
                    <div style={{ display: "block" }}>
                      <label>Route Name (required)</label>
                      <input
                        type="text"
                        onChange={this.handleChange("route_name")}
                        value={this.state.route_name}
                      />
                    </div>
                  </div>
                  <label className="form-control-label">Description</label>
                  <textarea
                    className="form-control-textarea"
                    cols="30"
                    rows="10"
                    onChange={this.handleChange("route_description")}
                    value={this.state.route_description}
                  />
                  <div className="modal-action-buttons">
                    <button
                      className="modal-action-buttons-cancel"
                      onClick={() => this.closeModal()}
                    >
                      close
                    </button>
                    <input
                      className="modal-action-buttons-save"
                      type="submit"
                      value="save"
                    />
                  </div>
                </form>
              </div>
            )}
          </Mutation>
        </div>
      </div>
    ) : (
      ""
    );

    return (
      <div className="workspace">
        {modal}
        <div className="panel topPanel">
          <div className="toolControls">
            <button
              className="modal-action-buttons-cancel"
              onClick={() => this.clearMap()}
            >
              Clear
            </button>
            <button
              className="modal-action-buttons-cancel"
              onClick={() => this.openModal()}
            >
              save
            </button>
            <button
              className="modal-action-buttons-cancel"
              onClick={() => {
                this.changeTravelMode();
              }}
            >
              {OtherRouteType}
            </button>
          </div>
        </div>
        <div className="mapCanvas" ref="map"></div>
        <div className="panel bottomPanel">
          <ul className="inlineStats">
            <li>
              <strong>{RouteType}</strong>
              <br />
              <label>Route Type</label>
            </li>
            <li>
              <strong>{distance}</strong>
              <br />
              <label>Distance</label>
            </li>
            <li>
              <strong>{duration}</strong>
              <br />
              <label>Est. Duration</label>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(RouteMap);
// let m = new window.google.maps.Marker({
//   position: point.location,
//   map: this.map
// });
