const { GraphQLBoolean, GraphQLObjectType } = require("graphql");
const LocationType = require("./location_type");

const RouteType = new GraphQLObjectType({
  name: "RouteType",
  fields: {
    location: { type: LocationType },
    stopover: { type: GraphQLBoolean }
  }
});

module.exports = RouteType;
