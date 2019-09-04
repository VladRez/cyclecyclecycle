import React from "react";
import { withRouter } from "react-router-dom";
import "./route.css";
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
      routeType: "polyline",
      route_details: {},
      modal: false
    };

    const directionsService = new window.google.maps.DirectionsService();
    this.directionsService = directionsService;

    this.clearMap = this.clearMap.bind(this);
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

    this.directionPolyLine = directionPolyLine;
    this.directionPolyLine.setMap(this.map);
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

  calculateAndDisplayRoute(opt = {}) {
  
    let origin = opt.origin || this.state.routes[0].location;
    let destination = opt.destination || this.state.routes[this.state.routes.length - 1].location;
    let waypoints = opt.waypoints || this.state.routes.slice(1, this.state.routes.length - 1);
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

        this.setState({route_details: res.routes[0].legs[0] });
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
    console.log(res);
    this.directionPolyLine.setPath(res.routes[0].overview_path);
  }

  clearMap() {
    this.setState({ routes: [], route_details: {} });
    this.directionPolyLine.setPath([]);
  }

  openModal() {
    this.setState({ modal: true });
  }

  closeModal() {
    this.setState({ modal: false });
  }

  changeTravelMode() {

    if (this.state.TravelMode === "WALKING") {
      this.setState({TravelMode: "BICYCLING"}) 
      if (this.state.routes.length) this.calculateAndDisplayRoute({travelMode: "BICYCLING"})
      
      }
      else {
        this.setState({TravelMode: "WALKING"})
      if (this.state.routes.length) this.calculateAndDisplayRoute({travelMode: "WALKING"})
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
        <form className="modalForm">
         <label>Route Name
         <input value="" type="text" />
         </label>

         <label>Description
         <textarea name="" id="" cols="30" rows="10"></textarea>
         </label>
          <input type="button" value="Save" />
          <button onClick={() => this.closeModal()}>close</button>
        </form>
       
      </div>
    ) : (
      ""
    );
    return (
      <div className="workspace">
        {modal}
        <div className="panel topPanel">
          {/* <div className="searchBar">
            <input placeholder="" type="text" />
            <button>Search</button>
          </div> */}
          <div className="toolControls">
            <button onClick={() => this.clearMap()}>X</button>
            <button onClick={() => this.openModal()}>save</button>
            <button onClick={() => {this.changeTravelMode()}}>{OtherRouteType}</button>
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
