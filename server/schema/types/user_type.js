const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean
} = require("graphql");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    _id: { type: GraphQLID },
    fname: { type: GraphQLString },
    lname: { type: GraphQLString },
    email: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean }
  }
});

module.exports = UserType