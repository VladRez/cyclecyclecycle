/*global google*/
import React, { Component } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: null,
      routePoints: []
    };

    this.addRoutePoint = this.addRoutePoint.bind(this);
    this.calculateAndDisplayRoute = this.calculateAndDisplayRoute.bind(this);
  }

  addRoutePoint(event) {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();

    const routePoint = {
      location: { lat, lng },
      stopover: true
    };

    this.setState(prevState => {
      return {
        routePoints: [...prevState.routePoints, routePoint]
      };
    });

    // if (this.state.routePoints.length > 1) {
      this.calculateAndDisplayRoute();
    // }
  }

  calculateAndDisplayRoute() {
    const directionsService = new google.maps.DirectionsService();

    const origin = this.state.routePoints[0].location;
    const destination = this.state.routePoints[
      this.state.routePoints.length - 1
    ].location;

    const waypts = this.state.routePoints.slice(
      1,
      this.state.routePoints.length - 1
    );

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.WALKING
      },
      (result, status) => {
        // debugger;
        if (status === google.maps.DirectionsStatus.OK) {
          console.log(result);
          this.setState({
            directions: result
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  render() {
    // debugger
    console.log(this.state.routePoints)
    const GoogleMapDirection = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: 37.769337, lng: -122.482471 }}
        defaultZoom={13}
        onClick={this.addRoutePoint}
      >
        <DirectionsRenderer directions={this.state.directions} />
      </GoogleMap>
    ));

    return (
      <div>
        <GoogleMapDirection
          containerElement={<div style={{ height: `500px`, width: "100%" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default Map;
// import React from "react";
// import {
//   withGoogleMap,
//   GoogleMap,
//   withScriptjs,
//   Marker,
//   DirectionsRenderer
// } from "react-google-maps";

// class MapDirectionsRenderer extends React.Component {
//   state = {
//     directions: null,
//     error: null
//   };

//   componentDidMount() {
//     const { places, travelMode } = this.props;

//     const waypoints = places.map(p =>({
//         location: {lat: p.latitude, lng:p.longitude},
//         stopover: true
//     }))
//     const origin = waypoints.shift().location;
//     const destination = waypoints.pop().location;

//     const directionsService = new window.google.maps.DirectionsService();

//     directionsService.route(
//       {
//         origin: origin,
//         destination: destination,
//         travelMode: travelMode,
//         waypoints: waypoints
//       },
//       (result, status) => {

//         if (status === window.google.maps.DirectionsStatus.OK) {
//           this.setState({
//             directions: result
//           });
//         } else {
//           this.setState({ error: result });
//         }
//       }
//     );
//   }

//   render() {
//     if (this.state.error) {
//       return <h1>{this.state.error}</h1>;
//     }
//     return (this.state.directions && <DirectionsRenderer directions={this.state.directions} />)
//   }
// }

// const Map = withScriptjs(
//   withGoogleMap(props => (
//     <GoogleMap
//       defaultCenter={props.defaultCenter}
//       defaultZoom={props.defaultZoom}
//     >
//       {props.markers.map((marker, index) => {
//         const position = { lat: marker.latitude, lng: marker.longitude };
//         return <Marker key={index} position={position} />;
//       })}
//       <MapDirectionsRenderer
//         places={props.markers}
//         travelMode={window.google.maps.TravelMode.DRIVING}
//       />
//     </GoogleMap>
//   ))
// );

// export default Map;
