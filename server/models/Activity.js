const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  distance: {
    type: Number,
    required: false,
    min: 0
  }
  //   duration: {
  //     type: Number,
  //     required: false,
  //     min: 0
  //   },
  //   elevation: {
  //     type: Number,
  //     required: false
  //   },
  //   sport: {
  //     type: String,
  //     required: true
  //   },
  //   date: {
  //     type: Date,
  //     default: Date.now
  //   },
  //   time: {
  //     type: Date,
  //     default: Date.now
  //   },
  //   title: {
  //     type: String,
  //     required: true
  //   },
  //   runtype: {
  //     type: String,
  //     required: true
  //   },
  //   tags: {
  //     type: String,
  //     required: false
  //   },
  //   description: {
  //     type: String,
  //     required: true
  //   },
  //   privacycontrols: {
  //     type: String,
  //     default: "All"
  //   }
});

module.exports = mongoose.model("activities", ActivitySchema);
