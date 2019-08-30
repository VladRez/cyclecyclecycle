const query = require("./types/root_query_type");
const mutation = require("./mutations")
const { GraphQLSchema } = require("graphql");

module.exports = new GraphQLSchema({
    query,
    mutation
})