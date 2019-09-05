const {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime
} = require("graphql-iso-date");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLFloat
} = require("graphql");

const ActivityType = new GraphQLObjectType({
  name: "ActivityType",
  fields: {
    _id: { type: GraphQLID },
    distance: { type: GraphQLFloat },
    distance_unit: { type: GraphQLString },
    duration_hr: { type: GraphQLInt },
    duration_min: { type: GraphQLInt },
    duration_sec: { type: GraphQLInt },
    elevation: { type: GraphQLFloat },
    elevation_unit: { type: GraphQLString },
    sport: { type: GraphQLString },
    date: { type: GraphQLDate },
    // time: { type: GraphQLTime },
    title: { type: GraphQLString },
    runtype: { type: GraphQLString },
    tags: { type: GraphQLString },
    description: { type: GraphQLString },
    privacycontrols: { type: GraphQLString }
  }
});

module.exports = ActivityType;
