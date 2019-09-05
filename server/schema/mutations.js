const { GraphQLDate, GraphQLTime, GraphQLDateTime } = require("graphql-iso-date");
const {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} = require("graphql");
const UserType = require("./types/user_type");
const ActivityType = require("./types/activity_type");
const AuthService = require("../services/auth");
const Activity = require("../services/activity_actions");
const MapType = require("./types/map_type");
const MapInputType = require("./types/input_types");
const MapService = require("../services/map")

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
        distance_unit: { type: GraphQLString },
        duration_hr: { type: GraphQLInt },
        duration_min: { type: GraphQLInt },
        duration_sec: { type: GraphQLInt },
        elevation: { type: GraphQLFloat },
        elevation_unit: { type: GraphQLString },
        sport: { type: GraphQLString },
        date: { type: GraphQLDate },
        time: { type: GraphQLDateTime },
        title: { type: GraphQLString },
        runtype: { type: GraphQLString },
        tags: { type: GraphQLString },
        description: { type: GraphQLString },
        privacycontrols: { type: GraphQLString }
      },
      resolve(_, args) {
        console.log("Args: ", args);
        debugger;
        return Activity.addActivity(args);
      }
    },

    addMap: {
      type: MapType,
      args: {
        input: { type: MapInputType }
      },
      resolve(_, { input }) {
        return MapService.createMap(input)
      }
    }
  }
});

module.exports = mutation;
