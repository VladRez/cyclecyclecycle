const { GraphQLDate, GraphQLTime } = require("graphql-iso-date");
const {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLString,
  GraphQLID
} = require("graphql");
const UserType = require("./types/user_type");
const ActivityType = require("./types/activity_type");
const AuthService = require("../services/auth");
const Activity = require("../services/activity_actions");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: UserType,
      args: {
        fname: { type: GraphQLString },
        lname: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        password2: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.register(args);
      }
    },
    logout: {
      type: UserType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(_, args) {
        return AuthService.logout(args);
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.login(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      }
    },
    addActivity: {
      type: ActivityType,
      args: {
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
      },
      resolve(_, args) {
        return Activity.addActivity(args);
      }
    }
  }
});

module.exports = mutation;
