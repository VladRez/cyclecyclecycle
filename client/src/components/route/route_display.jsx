import React from "react";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import mapOptions from "./gMapOptions";
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
      strokeColor: "#444444",
      strokeOpacity: 0.5,
      strokeWeight: 5
    });
    this.directionPolyLine = directionPolyLine;
    this.directionPolyLine.setMap(this.map);
  }

  calculateAndDisplayRoute(opt = {}) {
    debugger
    let origin = (({lat, lng})=>({lat, lng}))(opt.routes[0].location) 
    let destination =(({lat, lng})=>({lat, lng}))(opt.routes[opt.routes.length - 1].location) 
    let waypoints = opt.routes.slice(1, opt.routes.length - 1).map(waypoint=>{
      return {
        stopover: waypoint.stopover,
        location: (({lat, lng})=>({lat, lng}))(waypoint.location) 
      }
    })
    let travelMode = opt.travelMode; //window.google.maps.TravelMode.WALKING;
    let optimizeWaypoints = opt.optimizeWaypoints || false;
    ;
    let options = {
      origin,
      destination,
      waypoints,
      optimizeWaypoints,
      travelMode
    };
    
    this.directionsService.route(options, (res, status) => {
      
      if (status === "OK") {
        this.setState({ route_details: res.routes[0].legs[0] });
        if (this.state.routeType === "polyline") {
          this.renderPolyLine(res);
        } else {
          this.directionsDisplay.setDirections(res);
        }
      } else {
        console.log("error " + status);
      }
    });
  }

  renderPolyLine(res) {
    // this.directionPolyLine.setMap(null);
    debugger
    console.log(res);
    this.directionPolyLine.setPath(res.routes[0].overview_path);
  }

  render() {
    return (
      <div>
        <Query
          query={FETCH_MAP}
          variables={{ _id: this.props.match.params.id }}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            debugger
            this.calculateAndDisplayRoute(data.map);
            // this.setState(data.map)
            return <div>{JSON.stringify(data.map)}</div>;
          }}
        </Query>
        <div className="miniMap" ref="map"></div>
      </div>
    );
  }
}

export default withRouter(RouteDisplay);
