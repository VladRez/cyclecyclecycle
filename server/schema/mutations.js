const { GraphQLDate, GraphQLTime } = require("graphql-iso-date");
const {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLBoolean
} = require("graphql");
const UserType = require("./types/user_type");
const ActivityType = require("./types/activity_type");
const AuthService = require("../services/auth");
const Activity = require("../services/activity_actions");
const MapType = require("./types/map_type");


const LocationInputType = new GraphQLInputObjectType({
  name: "LocationInputType",
  fields: {
    lat: { type: GraphQLFloat },
    lng: { type: GraphQLFloat }
  }
});
const RouteInputType = new GraphQLInputObjectType({
  name: "RouteInputType",
  fields: {
    location: { type: LocationInputType },
    stopover: { type: GraphQLBoolean }
  }
});

const MapInputType = new GraphQLInputObjectType({
  name: "MapInputType",
  fields: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    travelMode: { type: GraphQLString },
    routes: { type: new GraphQLList(RouteInputType) }
  }
});
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
        duration_hr: { type: GraphQLInt },
        duration_min: { type: GraphQLInt },
        duration_sec: { type: GraphQLInt },
        elevation: { type: GraphQLFloat },
        sport: { type: GraphQLString },
        date: { type: GraphQLString },
        time: { type: GraphQLString },
        title: { type: GraphQLString },
        runtype: { type: GraphQLString },
        tags: { type: GraphQLString },
        description: { type: GraphQLString },
        privacycontrols: { type: GraphQLString }
      },
      resolve(_, args) {
        console.log("Args: ", args);
        //debugger;
        return Activity.addActivity(args);
      }
    },

    addMap: {
      type: MapType,
      args: {
        input: { type: MapInputType }
      },
      resolve(_, {input}) {
     
        console.log(input);
      }
    }
  }
});

module.exports = mutation;
