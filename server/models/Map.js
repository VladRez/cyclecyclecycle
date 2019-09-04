const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MapSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  routes: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model("maps", MapSchema);
