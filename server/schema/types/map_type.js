const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLBoolean,
    GraphQLList,
    GraphQLFloat
  } = require("graphql");

  const MapType = new GraphQLObjectType({
      name: "MapType",
      fields: {
          _id: { type: GraphQLID },
          name: { type: GraphQLString},
          description: {type: GraphQLString},
          routes: { type: GraphQLList(RouteType) }
      }
  });

  const RouteType = new GraphQLObjectType({
      name: "RouteType",
      fields: {
          _id: {type: GraphQLID},
          location: {type: CoordinateType},
          OptimizeWayPoints: {type: GraphQLBoolean}
          
      }
  })


  const CoordinateType = new GraphQLObjectType({
      name: "CoordinateType",
      fields: {
          lat: {type: GraphQLFloat },
          lng: {type: GraphQLFloat}
      }
  })