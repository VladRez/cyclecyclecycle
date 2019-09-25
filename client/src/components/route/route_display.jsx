import React from "react";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import mapOptions from "./gMapOptions";
import segmentNames from "./segment_names";
const { FETCH_MAP } = Queries;

class RouteDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: "",
      routes: [],
      route_details: {},
      travelMode: "WALKING",
      routeType: "polyline",
      details: {},
      name: "",
      description: ""
    };
  }
  componentDidMount() {
    const map = this.refs.map;

    this.map = new window.google.maps.Map(map, mapOptions);

    const directionsDisplay = new window.google.maps.DirectionsRenderer();
    this.directionsDisplay = directionsDisplay;
    this.directionsDisplay.setMap(this.map);
    const directionsService = new window.google.maps.DirectionsService();
    this.directionsService = directionsService;
    const directionPolyLine = new window.google.maps.Polyline({
      path: [],
      geodesic: true,
      strokeColor: "#ff0000",
      strokeOpacity: 1,
      strokeWeight: 2
    });
    this.directionPolyLine = directionPolyLine;
    this.directionPolyLine.setMap(this.map);
  }

  calculateAndDisplayRoute(opt = {}) {
    let origin = (({ lat, lng }) => ({ lat, lng }))(opt.routes[0].location);
    let destination = (({ lat, lng }) => ({ lat, lng }))(
      opt.routes[opt.routes.length - 1].location
    );
    let waypoints = opt.routes.slice(1, opt.routes.length - 1).map(waypoint => {
      return {
        stopover: waypoint.stopover,
        location: (({ lat, lng }) => ({ lat, lng }))(waypoint.location)
      };
    });
    let travelMode = opt.travelMode; //window.google.maps.TravelMode.WALKING;
    let optimizeWaypoints = opt.optimizeWaypoints || false;
    let options = {
      origin,
      destination,
      waypoints,
      optimizeWaypoints,
      travelMode
    };
    let center = {
      lat: (origin.lat + destination.lat) / 2,
      lng: (origin.lng + destination.lng) / 2
    };
    if (this.map === undefined) window.location.reload();
    this.map.setCenter(center);
    // this.map.fitBounds(origin, destination)
    this.directionsService.route(options, (res, status) => {
      if (status === "OK") {
        this.setState({ route_details: res.routes[0].legs[0] });
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

  render() {
    return (
      <div className="page-container">
        <div className="details-container">
          <div className="map-detail-container">
            <div className="map-route-body">
              <div className="map-canvas" ref="map"></div>

              <Query
                query={FETCH_MAP}
                variables={{ _id: this.props.match.params.id }}
              >
                {({ loading, error, data }) => {
                  if (loading) return <p>Loading...</p>;
                  if (error) return <p>Error</p>;

                  this.calculateAndDisplayRoute(data.map);

                  let tablebody = !Object.keys(this.state.route_details)
                    .length ? (
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  ) : (
                    this.state.route_details.steps.map((step, idx) => {
                      let segment = step.instructions.match(
                        /(?<=\<b\>)(.*?)(?=\<\/b\>)/g
                      );

                      segment = segment ? segment.join(" ") : step.instructions;
                      return (
                        <tr>
                          <td>
                            {
                              // Math.floor(Math.random() * segmentNames.length)
                              segmentNames[idx]
                            }
                          </td>
                          <td>{segment}</td>
                          <td>{step.distance.text}</td>
                          <td>{step.duration.text}</td>
                        </tr>
                      );
                    })
                  );
                  // this.setState(data.map)

                  return (
                    <div className="route-segments">
                      <h2>Segments</h2>
                      <table className="table-segments">
                        <tr>
                          <th>Name</th>
                          <th>Maneuver</th>
                          <th>Distance</th>
                          <th>Est Time</th>
                        </tr>
                        {tablebody}
                      </table>
                      <div className="map-detail-sidebar"></div>
                    </div>
                  );
                }}
              </Query>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(RouteDisplay);
