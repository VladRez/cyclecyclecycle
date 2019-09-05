const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RouteSchema = new Schema({
  stepover: { type: Schema.Types.Boolean },
  location: {
      type: Schema.Types.ObjectId,
      ref: "location"
  }
});

module.exports = mongoose.model("route", RouteSchema)
