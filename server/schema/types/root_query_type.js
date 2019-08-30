const mongoose = require("mongoose")
const User = mongoose.model("users")
const UserType = require("./user_type")
const { GraphQLObjectType, GraphQLNonNull, GraphQLID } = require("graphql")

const RootQueryType = new GraphQLObjectType({
    name: "RootQueryType",
    fields: () => ({
        user: {
            type: UserType,
            args: {_id: {type: new GraphQLNonNull(GraphQLID)}},
            resolve( parentValue, args) {
                return User.findById(args._id)
            }
        }
    })
});

module.exports = RootQueryType;