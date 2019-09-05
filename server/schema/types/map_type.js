const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType,GraphQLInputObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const RouteType = require("./route_type")

const MapType = new GraphQLObjectType({
  name: "MapType",
  fields: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    travelMode: { type: GraphQLString },
    routes: {type: new GraphQLList(RouteType) }
  }
});

module.exports = MapType;
