const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");
const UserType = require("./types/user_type");
const AuthService = require("../services/auth");

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
      }
  },
  
});

module.exports = mutation;
