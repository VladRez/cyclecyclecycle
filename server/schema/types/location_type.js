const { GraphQLFloat, GraphQLObjectType } = require("graphql");

const LocationType = new GraphQLObjectType({
  name: "LocationType",
  fields: {
    lat: { type: GraphQLFloat },
    lng: { type: GraphQLFloat }
  }
});

module.exports = LocationType;
