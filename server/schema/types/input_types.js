const {
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLString,
  GraphQLID
} = require("graphql");

const LocationInputType = new GraphQLInputObjectType({
  name: "LocationInputType",
  fields: {
    lat: { type: GraphQLFloat },
    lng: { type: GraphQLFloat }
  }
});
const RouteInputType = new GraphQLInputObjectType({
  name: "RouteInputType",
  fields: {
    location: { type: LocationInputType },
    stopover: { type: GraphQLBoolean }
  }
});

const MapInputType = new GraphQLInputObjectType({
  name: "MapInputType",
  fields: {
    userId: {type: GraphQLID},
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    travelMode: { type: GraphQLString },
    routes: { type: new GraphQLList(RouteInputType) }
  }
});

module.exports = MapInputType;
