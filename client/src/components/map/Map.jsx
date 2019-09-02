/*global google*/
import React, { Component } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";
class Map extends Component {
  state = {
    directions: null
  };

  componentDidMount() {
    const directionsService = new google.maps.DirectionsService();

    const origin = { lat: 37.771381, lng: -122.511009 };
    const destination = { lat: 37.770157, lng: -122.495133 };

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.WALKING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
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
    const GoogleMapDirection = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: 37.769337, lng: -122.482471 }}
        defaultZoom={13}
      >
        <DirectionsRenderer
          directions={this.state.directions}
        />
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
