import React from "react";
import { withRouter } from "react-router-dom";

const mapOptions = {
  center: {
    lat: 37.773972,
    lng: -122.431297
  }, // San Francisco coords
  zoom: 15,
  mapTypeId: "terrain",
  disableDefaultUI: true,
  styles: [
    {
      featureType: "poi.business",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "poi.government",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "poi.attraction",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "poi.medical",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "poi.school",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "poi.place_of_worship",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "transit",
      stylers: [{ visibility: "off" }]
    }
  ]
};

class RouteMap extends React.Component {
  constructor(props) {
    super(props);
    // this.routes = [];
    this.state = {
      routes: [],
      TravelMode: "WALKING",
      routeType: "polyline"
    };

    const directionsService = new window.google.maps.DirectionsService();
    this.directionsService = directionsService;

    this.clearMap = this.clearMap.bind(this)

    
  }

  componentDidMount() {
    const map = this.refs.map;
    this.map = new window.google.maps.Map(map, mapOptions);
    const directionsDisplay = new window.google.maps.DirectionsRenderer();
    this.directionsDisplay = directionsDisplay;
    this.directionsDisplay.setMap(this.map);
    this.handleClick();

    const directionPolyLine = new window.google.maps.Polyline({
      path: [],
      geodesic: true,
      strokeColor: "#444444",
      strokeOpacity: 0.5,
      strokeWeight: 5
    });

    this.directionPolyLine = directionPolyLine
    this.directionPolyLine.setMap(this.map)
  }

  handleClick() {
    window.google.maps.event.addListener(this.map, "click", event => {
      let point = {
        location: new window.google.maps.LatLng(
          event.latLng.lat(),
          event.latLng.lng()
        ),
        stopover: false
      };
      this.setState({ routes: [...this.state.routes, point] });

      this.calculateAndDisplayRoute();
    });
  }

  calculateAndDisplayRoute() {
    let origin = this.state.routes[0].location;
    let destination = this.state.routes[this.state.routes.length - 1].location;
    let waypoints = this.state.routes.slice(1, this.state.routes.length - 1);
    let travelMode = this.state.TravelMode; //window.google.maps.TravelMode.WALKING;
    let optimizeWaypoints = false;

    let options = {
      origin,
      destination,
      waypoints,
      optimizeWaypoints,
      travelMode
    };

    this.directionsService.route(options, (res, status) => {
      if (status === "OK") {
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
    this.directionPolyLine.setPath(res.routes[0].overview_path);
  }

  clearMap(){

    
  }
  render() {
    return (
      <div>
        <button
          style={{ zindex: 2 }}
          onClick={()=>this.clearMap()}
        >
          clear
        </button>
        <div
          style={{
            position: "absolute",
            width: "100%",
            margin: "auto",
            height: "100%"
          }}
          ref="map"
        ></div>
      </div>
    );
  }
}

export default withRouter(RouteMap);
// let m = new window.google.maps.Marker({
//   position: point.location,
//   map: this.map
// });
