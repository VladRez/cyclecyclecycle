import React, { Component } from 'react';
import { render } from 'react-dom';
import { withScriptjs } from "react-google-maps";
import Map from './Map';


const App = () => {
  const MapLoader = withScriptjs(Map);

  return (
    <MapLoader
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDd-3Aoty8CsCWocHbsrg9mBSm5V-evBhw"
      loadingElement={<div style={{ height: `100%` }} />}
    />
  );
};

export default App