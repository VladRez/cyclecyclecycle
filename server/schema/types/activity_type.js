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
  GraphQLFloat
} = require("graphql");

const ActivityType = new GraphQLObjectType({
  name: "ActivityType",
  fields: {
    _id: { type: GraphQLID },
    distance: { type: GraphQLFloat },
    duration: { type: GraphQLFloat },
    elevation: { type: GraphQLFloat },
    sport: { type: GraphQLString },
    date: { type: GraphQLDate },
    time: { type: GraphQLTime },
    title: { type: GraphQLString },
    runtype: { type: GraphQLString },
    tags: { type: GraphQLString },
    description: { type: GraphQLString },
    privacycontrols: { type: GraphQLString }
  }
});

module.exports = ActivityType;
