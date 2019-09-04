// /*global google*/
// import React, { Component } from "react";
// import {
//   withGoogleMap,
//   withScriptjs,
//   GoogleMap,
//   DirectionsRenderer,
//   Polyline,
//   SearchBox
// } from "react-google-maps";
// class Map extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       directions: null,
//       polyline: null,
//       routePoints: []
//     };


//     this.dr = null;
//     this.rp = []

//     this.addRoutePoint = this.addRoutePoint.bind(this);
//     this.calculateAndDisplayRoute = this.calculateAndDisplayRoute.bind(this);
//   }

//   addRoutePoint(event) {
//     const { latLng } = event;
//     const lat = latLng.lat();
//     const lng = latLng.lng();

//     const routePoint = {
//       location: { lat, lng },
//       stopover: true
//     };

//     this.setState(prevState => {
//       return {
//         routePoints: [...prevState.routePoints, routePoint]
//       };
//     });
//     this.rp.push(routePoint)
//     // if (this.state.routePoints.length > 1) {
//     this.calculateAndDisplayRoute();
//     // }
//   }

  


//    calculateAndDisplayRoute() {
//     const directionsService = new google.maps.DirectionsService();

//     const origin = this.state.routePoints[0].location;
//     const destination = this.state.routePoints[
//       this.state.routePoints.length - 1
//     ].location;

//     const waypts = this.state.routePoints.slice(
//       1,
//       this.state.routePoints.length - 1
//     );

//     // const origin = this.rp[0].location;
//     // const destination = this.rp[
//     //   this.rp.length - 1
//     // ].location;

//     // const waypts = this.rp.slice(
//     //   1,
//     //   this.rp.length - 1
//     // );

//     directionsService.route(
//       {
//         origin: origin,
//         destination: destination,
//         waypoints: waypts,
//         optimizeWaypoints: true,
//         travelMode: google.maps.TravelMode.WALKING
//       },
//       (result, status) => {
//         // debugger;
//         console.log(result);
//         if (status === google.maps.DirectionsStatus.OK) {
//           // console.log(result);
//           // debugger
//           this.setState({
//             directions: result,
//             polyline: result.routes[result.routes.length - 1].overview_path
//           });
//           // this.dr = result

//         } else {
//           console.error(`error fetching directions ${result}`);
//         }
//       }
//     );

//     // debugger;
//   }

//   targetMap(){
//    const map = new google.maps.Map(document.getElementById("map"), {
//       zoom: 14,
//       center: { lat: 37.77, lng: -122.447 }
//     });
//   }

//   componentDidMount(){
  
//   }

//   render() {
//     // debugger
//     console.log(this.state.routePoints);
    
//     const GoogleMapDirection = withGoogleMap(props => (
//       <GoogleMap
//         defaultCenter={{ lat: 37.769337, lng: -122.482471 }}
//         defaultZoom={15}
//         onClick={this.addRoutePoint}
//         ref={props.onMapLoad}
        
//       >
       
//        {/* { this.state.directions && <DirectionsRenderer directions={this.state.directions} />} */}
//         {/* <DirectionsRenderer directions={this.dr} /> */}
//         <Polyline
//           path={this.state.polyline}
//           geodesic={true}
//           options={{
//             strokeColor: "#A9A9A9",
//             strokeOpacity: 1,
//             strokeWeight: 7
//           }}
          
//         />
//       </GoogleMap>
//     ));
//     return (
//       <div>
//         <GoogleMapDirection
//           containerElement={<div style={{ height: `500px`, width: "100%" }} />}
//           mapElement={<div style={{ height: `100%` }} />}
//         />
//       </div>
//     );
//   }
// }

// export default Map;
