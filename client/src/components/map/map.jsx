// import React from "react";
// // eslint-disable-next-line
// import { Mutation } from "react-apollo";
// import Mutations from "../../graphql/mutations";
// // eslint-disable-next-line
// import { Link } from "react-router-dom";
// import {
//   Map,
//   GoogleApiWrapper,
//   Marker,
//   GoogleMap,
//   DirectionsRenderer,
//   DirectionsService
// } from "google-maps-react";
// import "./map.css";
// // eslint-disable-next-line
// const { LOGIN_USER } = Mutations;
// const mapStyles = {
//   width: "100%",
//   height: "100%"
// };
// class GMaps extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       markers: [],
//       waypoints: [],
//       origin: {},
//       destination: {}
//     };
//     this.addMarker = this.addMarker.bind(this);
//   }

//   addMarker(t, map, coord) {
//     const { latLng } = coord;
//     const lat = latLng.lat();
//     const lng = latLng.lng();

//     this.setState(previousState => {

//       return {
//         markers: [
//           ...previousState.markers,
//           {
//             title: "",
//             name: "",
//             position: { lat, lng }
//           }
//         ],
//       };
//     });

//   }

//   render() {
//     let initMarker = "";
//       if (this.state.markers.length === 1) {
//         let obj = this.state.markers[0]
//         initMarker= <Marker title={obj.title} name={obj.name} position={obj.position}/>
//       }
//     return (
//       <div>
//         <Map
//           google={this.props.google}
//           style={{ width: "100%", margin: "auto", height: "80%" }}
//           className={"map"}
//           zoom={14}
//           onClick={this.addMarker}
//         >
//           {initMarker}
//         </Map>
//       </div>
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: ""
// })(GMaps);

// // {this.state.markers.map((marker, index) => (
// //   <Marker
// //     key={index}
// //     title={marker.title}
// //     name={marker.name}
// //     position={marker.position}
// //   />
// // ))}
