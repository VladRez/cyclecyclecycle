import React from "react";
import { withRouter } from "react-router-dom";

const mapOptions = {
  center: {
    lat: 37.773972,
    lng: -122.431297
  }, // San Francisco coords
  zoom: 15,
  mapTypeId: "terrain"
};

class RouteMap extends React.Component {
  constructor(props) {
    super(props);
    this.routes = [];
  }



  componentDidMount() {
    this.initMap()
  }

  initMap(){
    const map = this.refs.map;
    this.map = new window.google.maps.Map(map, mapOptions);
    const directionsDisplay = new window.google.maps.DirectionsRenderer();
    const directionsService = new window.google.maps.DirectionsService();

    directionsDisplay.setMap(this.map);

    window.google.maps.event.addListener(this.map, "click", event => {
      let point = {
        location: new window.google.maps.LatLng(
          event.latLng.lat(),
          event.latLng.lng()
        ),
        stopover: false
      };
      this.routes.push(point);
      // let m = new window.google.maps.Marker({
      //   position: point.location,
      //   map: this.map
      // });
      this.calculateAndDisplayRoute(
        directionsService,
        directionsDisplay,
        this.routes
      );
    });
  }

  calculateAndDisplayPolyLine(directionsService, routes){
    
  }

  calculateAndDisplayRoute(directionsService, directionsDisplay, routes) {
    let origin = routes[0].location;
    let destination = routes[routes.length - 1].location;
    let waypoints = routes.slice(1, routes.length - 1);
    let travelMode = window.google.maps.TravelMode.WALKING;
    let optimizeWaypoints = false;

    let options = {
      origin,
      destination,
      waypoints,
      optimizeWaypoints,
      travelMode
    };

    // const directionPolyLine = new window.google.maps.Polyline({
    //   path: routes.map(route => route.location),
    //   geodesic: true,
    //   strokeColor: "#444444",
    //   strokeOpacity: 0.9,
    //   strokeWeight: 4
    // });
    // directionPolyLine.setMap(this.map);
    directionsService.route(options, (res, status) => {
      if (status === "OK") {
        directionsDisplay.setDirections(res);
      } else {
        console.log("error " + status);
      }
    });
  }

  render() {
    return (
        <div
          style={{position: "absolute", width: "100%", margin: "auto", height: "100%" }}
          ref="map"
        >
          map
        </div>

    );
  }
}

export default withRouter(RouteMap);
