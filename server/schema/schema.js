const query = require("./types/root_query_type");
const { GraphQLSchema } = require("graphql");

module.exports = new GraphQLSchema({
    query
})