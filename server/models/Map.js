const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coordinate = new Schema({
  lat: { type: Schema.Types.Double, required: true },
  lng: { type: Schema.Types.Double, required: true }
});

const waypoint = new Schema({
  location: [coordinate],
  stepover: { type: Schema.Types.Boolean, required: true, default: false }
});

const MapSchema = new Schema({
  name: { type: Schema.Types.String, required: true },
  description: { type: Schema.Types.String, required: true },
  travelMethod: { type: Schema.Types.String, required: true },
  routes: [[waypoint]]
});

module.exports = mongoose.model("maps", MapSchema);
