const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID
} = graphql;
const RouteType = require("./route_type");

const MapType = new GraphQLObjectType({
  name: "MapType",
  fields: {
    userId: {type: GraphQLID},
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    travelMode: { type: GraphQLString },
    routes: { type: new GraphQLList(RouteType) }
  }
});

module.exports = MapType;
