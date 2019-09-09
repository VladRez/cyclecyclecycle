const mongoose = require("mongoose");
const User = mongoose.model("users");
const Activity = mongoose.model("activities");
const UserType = require("./user_type");
const ActivityType = require("./activity_type");
const MapType = require("./map_type");
const Map = mongoose.model("map");

const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLString
} = require("graphql");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, args) {
        return User.findById(args._id);
      }
    },
    activity: {
      type: ActivityType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, args) {
        return Activity.findById(args._id);
      }
    },
    activity_by_user: {
      type: new GraphQLList(ActivityType),
      args: { user_id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, args) {
        //console.log("USER_ID: ", args.user_id);
        return Activity.find({ user_id: args.user_id });
        //db.inventory.find({ status: "D" })
      }
    },
    activities: {
      type: new GraphQLList(ActivityType),
      resolve() {
        return Activity.find({});
      }
    },
    maps: {
      type: new GraphQLList(MapType),
      resolve() {
        return Map.find({});
      }
    },
    map: {
      type: MapType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Map.findById(args._id);
      }
    },
    user_maps: {
      type: new GraphQLList(MapType),
      args: { userId: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Map.find({ userId: args.userId });
      }
    }
  })
});

module.exports = RootQueryType;
