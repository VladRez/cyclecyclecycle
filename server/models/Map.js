const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MapSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'users'},
  name: Schema.Types.String,
  description: Schema.Types.String,
  travelMode: Schema.Types.String,
  // routes: [{
  //     type: Schema.Types.ObjectId,
  //     ref: "route"
  // }]
  routes: [
    {
      location: {
        lat: Schema.Types.Number,
        lng: Schema.Types.Number
      },
      stopover: Schema.Types.Boolean
    }
  ]
});

module.exports = mongoose.model("map", MapSchema);
