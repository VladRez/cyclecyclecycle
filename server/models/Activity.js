const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  distance: {
    type: Number,
    required: false,
    min: 0
  },
  distance_unit: {
    type: String,
    required: false
    // default: "Miles"
  },
  duration_hr: {
    type: Number,
    required: false,
    min: 0
  },
  duration_min: {
    type: Number,
    required: false,
    min: 0,
    max: 60
  },
  duration_sec: {
    type: Number,
    required: false,
    min: 0,
    max: 60
  },
  elevation: {
    type: Number,
    required: false
  },
  elevation_unit: {
    type: String,
    required: false
    // default: "Feet"
  },
  sport: {
    type: String,
    required: false
  },
  date: {
    type: String,
    required: false
  },
  time: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: false
  },
  runtype: {
    type: String,
    required: false
  },
  tags: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  privacycontrols: {
    type: String,
    default: "All"
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: false
  }
});

module.exports = mongoose.model("activities", ActivitySchema);
