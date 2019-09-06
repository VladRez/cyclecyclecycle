const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    lat: { type: Schema.Types.Decimal128 },
    lng: { type: Schema.Types.Decimal128 },
    route: {
        type: Schema.Types.ObjectId,
        ref: "route"
    }
});

module.exports = mongoose.model("location", LocationSchema)