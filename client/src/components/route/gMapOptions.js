export default {
  center: {
    lat: 37.773972,
    lng: -122.431297
  }, // San Francisco coords
  zoom: 13,
  mapTypeId: "terrain",
  disableDefaultUI: true,
  zoomControl: true,
  zoomControlOptions: {
    position: window.google ? window.google.maps.ControlPosition.LEFT_CENTER : window.location.reload()
},
  mapTypeControl: true,
  mapTypeControlOptions: {
    position: window.google ? window.google.maps.ControlPosition.LEFT_CENTER : window.location.reload()
  },
  scaleControl: true,
  rotateControl: true,
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
