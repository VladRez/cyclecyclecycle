const mongoose = require("mongoose");
const User = mongoose.model("users");
const Activity = mongoose.model("activities");
const UserType = require("./user_type");
const ActivityType = require("./activity_type");

const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList
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
    activities: {
      type: new GraphQLList(ActivityType),
      resolve() {
        return Activity.find({});
      }
    }
  })
});

module.exports = RootQueryType;
