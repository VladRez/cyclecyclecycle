const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MapSchema = new Schema({
    name: Schema.Types.String,
    description: Schema.Types.String,
    travelMode: Schema.Types.String,
    routes: [{
        type: Schema.Types.ObjectId,
        ref: "route"
    }]
})

MapSchema.static.findRoutes = (mapId) => {
    return this.findById(mapId)
        .populate("routes")
        .then(map=>map.routes)
}

MapSchema.static.createMap = (data) => {
    const Location = mongoose.model("location")
    const Route = mongoose.model("route")
    debugger
}

module.exports = mongoose.model("map", MapSchema)